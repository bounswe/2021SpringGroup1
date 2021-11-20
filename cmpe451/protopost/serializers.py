from django.core.checks.messages import Error
from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import User
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
    class Meta:
        model = Community
        fields = ["name","description","community_image_url","moderator"]
        read_only_fields=["moderator"]
    
    def to_representation(self, instance):
        representation = {}
        if instance.name!='': #condition
            representation['@context']= "http://schema.org/"
            representation['@type']= "Organization"
            representation.update(super().to_representation(instance))
            return representation
        return representation
    

class DataFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataField
        fields = ["name","type","content","post"]
        read_only_fields=["post"]



class DataFieldTempSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataFieldTemp
        fields = ["name","type","post_template"]
        read_only_fields=["post_template"]
    

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
    def validate(self, attrs):
        attrs = super().validate(attrs)
        if "data_fields" in attrs and "post_template" in attrs:
            data_fields=attrs["data_fields"]
            #post_template=PostTemplate.objects.get(pk=attrs["post_template"])
            df_name_value_pairs=[(df["name"],df["type"]) for df in data_fields]
            dft_name_value_pairs=[(dft.name,dft.type) for dft in attrs["post_template"].data_field_templates.all()]
            if not df_name_value_pairs == dft_name_value_pairs:
                raise ValidationError("Data fields does not match")
        return attrs

    
# class PostTemplateReturningSerializer(serializers.ModelSerializer):
#     data_field_templates=DataFieldTempSerializer(many=True, source="post_template_id")
#     class Meta:
#         model = PostTemplate
#         fields = ['id','community',"name","data_field_templates"]
#         read_only_fields=['id','community']

