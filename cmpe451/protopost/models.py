from django.db import models
from django.contrib.auth.models import User

import json
# Create your models here.

class Community(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=max)
    community_image_url = models.CharField(max_length=200, blank=True, null=True)
    moderator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='moderator', blank=True, null=True) #A community has only one moderator.
    is_private = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add = True,verbose_name = "Oluşturulma tarihi")
    joined_users=models.ManyToManyField(User,related_name='joined_communities')
    #TODO:Update this string.

    def __str__(self)-> str:
        data = {
            "id": self.id,
            "name": self.name,
            "moderator_name": self.moderator.firstname,
        }
        return data

class PostTemplate(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    name=models.CharField(max_length=50, verbose_name='Name')
    description = models.TextField(max_length=max, verbose_name='Description')
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='post_templates', blank=True, null=True) #A post can be in only one community.
    
    def __str__(self) -> str:
        dataFields=self.data_field_templates.all()
        dataFieldDict={}
        i=1
        for d in dataFields:
            dataFieldDict[i]=d.__str__()
            i+=1
        
        data = {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "data_field_temps": dataFieldDict
        }
        return data

class Post(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    poster = models.ForeignKey(User,on_delete=models.CASCADE,related_name='posts', blank=True, null=True)
    title = models.CharField(max_length=50, verbose_name='Title')
    created_date = models.DateTimeField(auto_now_add=True, verbose_name="Created Date")
    post_template=models.ForeignKey(PostTemplate, on_delete=models.CASCADE, blank=True, null=True)
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='posts', blank=True, null=True) #A post can be in only one community.
    
    def __str__(self) -> str:
        dataFieldsList=self.data_fields.all()
        dataFieldDict={}
        i=1
        for d in dataFieldsList:
            dataFieldDict[i]=d.__str__()
            i+=1
        data = {
            "id": self.id,
            "poster": self.poster.username,
            "title": self.title,
            "created_date": self.created_date,
            "data_fields":dataFieldDict
        }
        return data

class DataField(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    post=models.ForeignKey(Post, on_delete=models.CASCADE, related_name='data_fields', blank=True, null=True)
    name=models.CharField(max_length=50, verbose_name='Name')
    type=models.CharField(max_length=50, verbose_name='Type')
    content=models.JSONField(max_length=max, verbose_name='Data')
    def __str__(self) -> str:
        data = {
            "id": self.id,
            "post_id":self.post.id,
            "name": self.name,
            "type": self.type,
            "content": self.content
        }
        return data

class DataFieldTemp(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    name=models.CharField(max_length=50, verbose_name='Name')
    type=models.CharField(max_length=50, verbose_name='Type')
    form_content=models.JSONField(max_length=max, verbose_name='Data')
    post_template=models.ForeignKey(PostTemplate, on_delete=models.CASCADE, related_name='data_field_templates', blank=True, null=True)
    def __str__(self) -> str:
        data = {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "form_content": self.form_content
        }
        return data





