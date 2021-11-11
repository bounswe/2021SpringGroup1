from django.shortcuts import render
from django.http import HttpResponse
from .home import *
from .register import *
from .serializers import *
from rest_framework.generics import GenericAPIView
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import UpdateAPIView

# class CreatePostView(CreateAPIView):
# 	def post(self, request, *args, **kwargs):
		


class CommunityAPIView(ListAPIView):
    """Lists all todos from the database"""
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
class UserAPIView(ListAPIView):
    """Lists all todos from the database"""
    queryset = User.objects.all()
    serializer_class = UserSerializer