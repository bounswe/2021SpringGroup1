from django.conf.urls import url
from django.contrib import admin
from . import views
app_name = "personroutes"

urlpatterns = [
    url("createPerson/",views.createPerson,name="createPerson"),
    url("getFirst/",views.getFirst,name="getFirst"),
    url("getLast/",views.getLast,name="getLast"),
    url("savePeople/",views.savePeople,name="savePeople"),
    url("person/(?P<id>\d+)/",views.person,name="person"),
]