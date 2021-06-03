from django.conf.urls import url
from django.urls import path
from django.contrib import admin
from . import views
app_name = "mainapp"

urlpatterns = [
    path("mainPage", views.mainPage, name="mainPage"),
    path("login_ui/", views.login_ui, name="login_ui"),
    path("createCommunity_ui/",views.createCommunity_ui,name="createCommunity_ui"),
    path("viewCommunity_ui/",views.viewCommunity_ui,name="viewCommunity_ui"),
    //TODO:remove non-ui paths.
    path("getSuggestions/",views.getSuggestions,name="getSuggestions"),
    path("getAllCommuntiesOfUser/", views.mainPage, name="mainPage"),
]