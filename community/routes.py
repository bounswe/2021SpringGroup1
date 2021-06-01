from django.conf.urls import url
from django.contrib import admin
from . import views
app_name = "communityroutes"

urlpatterns = [
    url("createCommunity/",views.createCommunity,name="createCommunity"),
    url("getFirst/",views.getFirst,name="getFirst"),
    url("getLast/",views.getLast,name="getLast"),
    url("getAll/",views.getAll,name="getAll"),
    url("getSuggestions/",views.getSuggestions,name="getSuggestions"),
    url("deleteCommunity/",views.deleteCommunity,name="deleteCommunity"),
]