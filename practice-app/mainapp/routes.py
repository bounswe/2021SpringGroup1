from django.conf.urls import url
from django.urls import path
from django.contrib import admin
from . import views
app_name = "mainapp"

urlpatterns = [
    path("mainPage", views.mainPage, name="mainPage"),
    path("createPerson", views.createPerson, name="createperson"),
    path("createCommunity_ui/",views.createCommunity_ui,name="createCommunity_ui"),
    path("viewCommunity_ui/",views.viewCommunity_ui,name="viewCommunity_ui"),
    path("getSuggestions/",views.getSuggestions,name="getSuggestions"),
    path("getAllCommunitiesOfUser/", views.getAllCommunitiesOfUser, name="getAllCommunitiesOfUser"),
    path("createCommunity/",views.createCommunity, name="createCommunity"),
    path("getAllPostsOfCommunity/", views.getAllPostsOfCommunity, name="getAllPostsOfCommunity"),
    path("createPostTemplate_ui/",views.createPostTemplate_ui,name="createPostTemplate_ui"),
    path("createPostTemplate/",views.createPostTemplate,name="createPostTemplate"),
    path("getCommunityTemplates/",views.getCommunityTemplates, name="getCommunityTemplates"),
    path("createPost_ui/",views.createPost_ui,name="createPost_ui"),
    path("createPost/",views.createPost,name="createPost"),
    path("viewPost_ui/",views.viewPost_ui,name="viewPost_ui"),
    path("leaveCommunity_ui/",views.leaveCommunity_ui,name="leaveCommunity_ui"),
    path("joinCommunity/",views.joinCommunity,name="joinCommunity"),
    path("checkVideo", views.checkVideo, name="checkVideo"),
    path("getPost",views.getPost,name="getPost"),
    path("getPostTemplate",views.getPostTemplate,name="getPostTemplate"),
    path("getGifs/",views.getGifs,name="getGifs"),
    #RESTFUL API calls for external usage
    path("external/getAllCommunities",views.external_api_getAllCommunities,name="getAllCommunities"),
    path("external/deleteCommunity",views.external_api_deleteCommunity,name="deleteCommunity"),
    path("external/createCommunity",views.external_api_createCommunity,name="createCommunity"),
    path("external/getPost",views.external_api_getPost,name="external_api_getPost"),
    path("external/getPostTemplate",views.external_api_getPostTemplate,name="external_api_getPostTemplate"),
    path("external/createPost",views.external_api_createPost,name="external_api_createPost"),
    path("external/createPostTemplate",views.external_api_createPostTemplate,name="external_api_createPostTemplate"),
]
