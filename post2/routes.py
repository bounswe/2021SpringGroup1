from django.conf.urls import url
from django.urls import path
from django.contrib import admin
from . import views
app_name = "post2"

urlpatterns = [
    path("", views.mainPage, name="mainPage"),
    path("viewAllPosts", views.viewAllPosts, name="viewAllPosts"),
    path("createPost/templates",views.viewTemplates, name="viewTemplates"),
    path("createPost?template_id=<int:template_id>",views.createPost,name="createPost"),
    path("createPostTemplate/name",views.createPostTemplateName,name="createPostTemplateName"),
    path("createPostTemplate/initial",views.createPostTemplateFieldInitial,name="createPostTemplateFieldInitial"),
    path("createPostTemplate/page",views.createPostTemplatePage,name="createPostTemplatePage"),
    path("createPostTemplate/fields",views.createPostTemplateAddField,name="createPostTemplateAddField"),
    path("savePost",views.savePost,name="savePost"),
    path("savePostTemplate",views.savePostTemplate,name="savePostTemplate"),
    path("savePost",views.savePost,name="savePost"),
    
]
