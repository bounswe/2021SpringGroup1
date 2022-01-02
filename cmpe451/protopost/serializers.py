from functools import partial
import re
import urllib.parse
from django.core.checks.messages import Error
from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import User
from .models import Community, DataField, DataFieldTemp, Post, PostTemplate
from rest_framework import serializers, validators
from rest_framework.validators import UniqueTogetherValidator

from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","email","password"]
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

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
    else:
        return False    

class DataFieldSerializer(serializers.ModelSerializer):
    reference_name=serializers.SerializerMethodField()
    class Meta:
        model = DataField
        fields = ["name","type","content","reference_name"]
        read_only_fields=["reference_name"]
    
    def validate(self, attrs):
        attrs=super().validate(attrs)
        df_type=attrs.get("type",None)
        if DATA_FIELD_FORMAT_CHECK:
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
        fields = ["name","type","reference_name"]
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
            except:
                for field in created_fields:
                    field.delete()
                post_template.delete()
                raise Error
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
                created_fields.append(DataField.objects.create(**field,post=post))
            except:
                for field in created_fields:
                    field.delete()
                post.delete()
                raise Error
        return post
    def update(self, instance, validated_data):
        instance.title=validated_data.get('title',instance.title)
        instance.save()
        post_data_fields=instance.data_fields.all()
        request_data_fields=validated_data.get("data_fields",[])

        for df in request_data_fields:
            for data_field in post_data_fields:
                if data_field.name==df["name"]:
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


