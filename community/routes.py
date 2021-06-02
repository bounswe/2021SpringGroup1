from django.conf.urls import url
from django.contrib import admin
from . import views
app_name = "communityroutes"

urlpatterns = [
    url("mainPage", views.mainPage, name="mainPage"),
    url("createCommunity_ui", views.createCommunity_ui, name="createCommunity_ui"),
    url("deleteCommunity_ui", views.deleteCommunity_ui, name="deleteCommunity_ui"),
    url("getSuggestions_ui", views.getSuggestions_ui, name="getSuggestions_ui"),
    
    url("createCommunity/",views.createCommunity,name="createCommunity"),
    url("getFirst/",views.getFirst,name="getFirst"),
    url("getLast/",views.getLast,name="getLast"),
    url("getAll/",views.getAll,name="getAll"),
    url("getSuggestions/",views.getSuggestions,name="getSuggestions"),
    url("deleteCommunity/",views.deleteCommunity,name="deleteCommunity"),
]