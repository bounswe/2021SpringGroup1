from django.conf.urls import url
from django.urls import path
from django.contrib import admin
from . import views
app_name = "mainapp"

urlpatterns = [
    path("", views.mainPage, name="mainPage"),
]