from django.conf.urls import url
from django.urls import path
from django.contrib import admin
from . import views
app_name = "loginroutes"

urlpatterns = [
    path("", views.loginpage, name="loginpage"),
    path("errorpage", views.errorpage, name="errorpage"),
]
