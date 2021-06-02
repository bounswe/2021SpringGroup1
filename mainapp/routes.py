from django.conf.urls import url
from django.urls import path
from django.contrib import admin
from . import views
app_name = "mainapp"

urlpatterns = [
    path("mainPage", views.mainPage, name="mainPage"),
    path("getAllCommuntiesOfUser/", views.mainPage, name="mainPage"),
    path("createCommunity_ui/",views.createCommunity_ui,name="createCommunity_ui"),
    path("viewCommunity_ui/",views.viewCommunity_ui,name="viewCommunity_ui"),
    path("getSuggestions/",views.getSuggestions,name="getSuggestions")
]