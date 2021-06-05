from django.conf.urls import url
from django.urls import path
from django.contrib import admin
from . import views
app_name = "mainapp"

urlpatterns = [
    path("mainPage", views.mainPage, name="mainPage"),
    #path("login_ui/", views.login_ui, name="login_ui"),
    path("createCommunity_ui/",views.createCommunity_ui,name="createCommunity_ui"),
    path("viewCommunity_ui/",views.viewCommunity_ui,name="viewCommunity_ui"),
    #TODO:remove non-ui paths.
    path("getSuggestions/",views.getSuggestions,name="getSuggestions"),
    path("getAllCommunitiesOfUser/", views.getAllCommunitiesOfUser, name="getAllCommunitiesOfUser"),
    path("createCommunity/",views.createCommunity, name="createCommunity"),
    path("getAllPostsOfCommunity/", views.getAllPostsOfCommunity, name="getAllPostsOfCommunity"),
    path("createPostTemplate_ui/",views.createPostTemplate_ui,name="createPostTemplate_ui"),
    path("createPostTemplate/",views.createPostTemplate,name="createPostTemplate")
]