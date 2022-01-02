from django.db import models
from django.contrib.auth.models import User

import json
# Create your models here.
DATA_TYPES = (
        ('text', 'Text'),
        ('image', 'Image'),
        ('location', 'Location'),
        ('date', 'Date'),
        ('number','Number'),
        ('selection','Selection')
    )
class Community(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50,unique=True)
    description = models.CharField(max_length=200)
    community_image_url = models.CharField(max_length=200, blank=True, null=True)
    moderator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='moderator', blank=True, null=True) #A community has only one moderator.
    is_private = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add = True,verbose_name = "Oluşturulma tarihi")
    joined_users=models.ManyToManyField(User,related_name='joined_communities')

    def __str__(self)-> str:
        data = {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "community_image_url" : self.community_image_url,
            "created_date": str(self.created_date),
            "moderator_name": self.moderator.username if self.moderator else "No Moderator"
        }
        return data

    # def get_all_fields_names(self):
    #     return [f.name for f in Community._meta.get_fields()]

class PostTemplate(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    name=models.CharField(max_length=50, verbose_name='Name')
    description = models.TextField(max_length=max, verbose_name='Description')
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='post_templates', blank=True, null=True)
    
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
  
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['name', 'community'],
                name="Unique Post Template"
            )
        ]
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
            "created_date": str(self.created_date),
            "data_fields":dataFieldDict
        }
        return data

class DataField(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    post=models.ForeignKey(Post, on_delete=models.CASCADE, related_name='data_fields', blank=True, null=True)
    name=models.CharField(max_length=50, verbose_name='Name')
    type=models.CharField(max_length=50, verbose_name='Type',choices=DATA_TYPES)
    content=models.JSONField(max_length=max, verbose_name='Data')
    image=models.ImageField(upload_to="images/",blank=True,null=True)
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
    type=models.CharField(max_length=50, verbose_name='Type',choices=DATA_TYPES)
    form_content=models.JSONField(max_length=max, verbose_name='Data', blank=True, null=True)
    post_template=models.ForeignKey(PostTemplate, on_delete=models.CASCADE, related_name='data_field_templates', blank=True, null=True)
    def __str__(self) -> str:
        data = {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "form_content": self.form_content
        }
        return data
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['name', 'post_template'],
                name="Unique Data Field Templates"
            )
        ]

class Comment(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    commenter = models.ForeignKey(User,on_delete=models.CASCADE,related_name='comments', blank=True, null=True)
    post=models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments', blank=True, null=True)
    replied_comment=models.ForeignKey("self", on_delete=models.CASCADE, related_name='replies', blank=True, null=True)
    body=models.CharField(max_length=1000)
    created_date = models.DateTimeField(auto_now_add=True, verbose_name="Created Date")
'''
class Image(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    data_field=models.ForeignKey(DataField,related_name="image",on_delete=models.CASCADE)
    image_file=models.ImageField(upload_to="images/")

'''