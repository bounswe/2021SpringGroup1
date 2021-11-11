from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields="__all__"
class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = "__all__"
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
class PostTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostTemplate
        fields = "__all__"

class DataFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataField
        fields = "__all__"
class DataFieldTempSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataFieldTemp
        fields = "__all__"
