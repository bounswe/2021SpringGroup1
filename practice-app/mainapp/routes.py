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
    #TODO:remove non-ui paths.
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
    path("getTrNews/",views.getTrNews,name="getTrNews"),
    path("getFirst_news/",views.getFirst_news,name="getFirst_news"),
    path("getLast_news/",views.getLast_news,name="getLast_news"),
    path("newsPage/",views.newsPageUI,name="newsPageUI"),
    path("createNews/",views.createNews_ui,name="createNews_ui"),
]
