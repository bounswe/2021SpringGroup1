from functools import partial
import re
import urllib.parse
#from django.conf import _DjangoConfLazyObject
from django.core.checks.messages import Error
from django.core.exceptions import ValidationError
from django.db import models
#from django.contrib.auth.models import User
from .models import User
from django.db.models import fields
from rest_framework.fields import ImageField
from .models import Community, DataField, DataFieldTemp, Post, PostTemplate,Comment
from rest_framework import serializers, validators
from rest_framework.validators import UniqueTogetherValidator
from drf_spectacular.utils import extend_schema_serializer

from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","email","password","first_name","last_name","profile_picture"]
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super(User, self).get_serializer(*args, **kwargs)

class CommunitySerializer(serializers.ModelSerializer):
    isJoined=serializers.SerializerMethodField()
    class Meta:
        model = Community
        fields = ["id","name","description","community_image_url","moderator","isJoined"]
        read_only_fields=["moderator","id","isJoined"]
    
    def get_isJoined(self,obj):
        try:
            if Community.objects.get(pk=obj.id) in self.context['request'].user.joined_communities.all():
                return True
            else:
                return False
        except:
            return False

       
    def to_representation(self, instance):
        representation = {
            '@context' : "http://schema.org/",
            '@type' : "Organization"
        }
        representation.update(super().to_representation(instance))
        return representation

DATA_FIELD_FORMAT_CHECK=True

data_field_formats={
    "location": {"adrs":str,"marker":{"lat":float,"lng":float}},
    "text":{"value":str},
    "number":{"value":int},
    "image":{"url":str},
    "date":{"value":str}
}

def content_format_check(content,format):
    if isinstance(content,dict) and isinstance(format,dict):
        for field_name,type in format.items():
            field_to_check=content.get(field_name,None)
            if field_to_check:
                if isinstance(type,dict):
                    if not content_format_check(field_to_check,type):
                        return False
                else:
                    if not isinstance(field_to_check,type):
                        return False
            else:
                return False
        return True
    elif isinstance(format,None):
        return True
    else:
        return False    


class DataFieldSerializer(serializers.ModelSerializer):
    reference_name=serializers.SerializerMethodField()
    image=serializers.ImageField(use_url=True,required=False)
    class Meta:
        model = DataField
        fields = ["name","type","content","reference_name","image"]
        read_only_fields=["reference_name"]
    def to_representation(self, instance):
        repr=super().to_representation(instance)
        if repr["image"]:
            repr["content"]["url"]=repr["image"]
        repr.pop("image")
        return repr
    def validate(self, attrs):
        attrs=super().validate(attrs)
        df_type=attrs.get("type",None)
        if DATA_FIELD_FORMAT_CHECK:
            if df_type in data_field_formats:
                if not content_format_check(attrs["content"],data_field_formats[df_type]):
                    raise ValidationError("Data field %s are in wrong format" % (attrs.get("name","unknown")))
        return attrs
    
    def get_reference_name(self,obj):
        try:
            return urllib.parse.quote(obj.name)
        except:
            return ""



class DataFieldTempSerializer(serializers.ModelSerializer):
    reference_name=serializers.SerializerMethodField()
    class Meta:
        model = DataFieldTemp
        fields = ["name","type","options","reference_name"]
        read_only_fields=["reference_name"]
    
    def get_reference_name(self,obj):
        try:
            return urllib.parse.quote(obj.name)
        except:
            return ""
    

class PostTemplateSerializer(serializers.ModelSerializer):
    data_field_templates=DataFieldTempSerializer(many=True)
    class Meta:
        model = PostTemplate
        fields = ['id','community',"name","data_field_templates"]
        read_only_fields=['id','community']
    
    def create(self, validated_data):
        data_field_templates=validated_data.pop('data_field_templates')
        post_template=PostTemplate.objects.create(**validated_data)
        created_fields=[]
        for field in data_field_templates:
            try:
                created_fields.append(DataFieldTemp.objects.create(**field,post_template=post_template))
            except Exception as e:
                for field in created_fields:
                    field.delete()
                post_template.delete()
                raise e
        return post_template

class PostSerializer(serializers.ModelSerializer):
    data_fields=DataFieldSerializer(many=True)

    class Meta:
        model = Post
        fields = ['id','poster','community',"title","post_template","data_fields",'created_date']
        read_only_fields=['id','poster','community','created_date']
    
    def to_representation(self, instance):
        representation = {
            "poster_name": instance.poster.username,
            "community_name" : instance.community.name
        }
        representation.update(super().to_representation(instance))
        return representation
    def create(self, validated_data):
        data_fields=validated_data.pop('data_fields')
        post=Post.objects.create(**validated_data)
        created_fields=[]
        for field in data_fields:
            try:
                if field["type"]=="image":
                    image_data=validated_data.get(field["name"]+"_image",None)
                    if image_data:
                        field["image"]=image_data
                data_field_instance=DataFieldSerializer(data=field)
                #field_instance=DataField.objects.create(**field,post=post)
                if data_field_instance.is_valid():
                    data_field_instance.save(post=post)
                    created_fields.append(data_field_instance)
                else:
                    for field in created_fields:
                        field.delete()
                    post.delete()
                    raise Error
            except Exception as e:
                for field in created_fields:
                    field.delete()
                post.delete()
                raise e
        return post
    def update(self, instance, validated_data):
        instance.title=validated_data.get('title',instance.title)
        instance.save()
        post_data_fields=instance.data_fields.all()
        request_data_fields=validated_data.get("data_fields",[])

        for df in request_data_fields:
            for data_field in post_data_fields:
                if data_field.name==df["name"]:
                    if data_field.type=="image":
                        image_data=validated_data.get(data_field.name+"_image",None)
                        if image_data:
                            df["image"]=image_data
                    update_data_field=DataFieldSerializer(data_field,data=df,partial=True)
                    if update_data_field.is_valid():update_data_field.save()

        return instance
    
    def validate(self, attrs):
        attrs = super().validate(attrs)
        if "data_fields" in attrs and "post_template" in attrs:
            data_fields=attrs["data_fields"]
            df_name_value_pairs=[(df["name"],df["type"]) for df in data_fields]
            dft_name_value_pairs=[(dft.name,dft.type) for dft in attrs["post_template"].data_field_templates.all()]
            if not df_name_value_pairs == dft_name_value_pairs:
                raise ValidationError("Data fields does not match")
        return attrs

'''
This serializer (RecursiveField) is from https://stackoverflow.com/a/27236783. 
It is used to add a serializer field that has the same representation with its parent serializer.
Since native DRF does not support recursive fields, I decided to use this simple workaround.
'''
class RecursiveField(serializers.Serializer):
    def to_representation(self, instance):
        serializer=self.parent.parent.__class__(instance,context=self.context)
        return serializer.data  

class CommentThreadSerializer(serializers.ModelSerializer):
    replies=RecursiveField(many=True,required=False)
    class Meta:
        model=Comment
        fields = ['id','post','replied_comment','commenter','body','created_date','replies']
        read_only_fields=['id','commenter','created_date','replies']

class CommentFlatSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields = ['id','post','replied_comment','commenter','body','created_date']
        read_only_fields=['id','commenter','created_date']
       
    

