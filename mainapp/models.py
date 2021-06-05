from django.db import models
from person.models import Person
import json
# Create your models here.
class Community(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, verbose_name="Topluluk Adı")
    description = models.TextField(max_length=max, verbose_name='Description')
    moderator = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='moderator') #A community has only one moderator.
    numUsers = models.IntegerField(verbose_name = "Kullanıcı Sayısı")
    numPosts = models.IntegerField(verbose_name = "Post Sayısı")
    isPrivate = models.BooleanField(verbose_name = "Private mı?")
    createdDate = models.DateTimeField(auto_now_add = True,verbose_name = "Oluşturulma tarihi")
    joinedUsers=models.ManyToManyField(Person,related_name='joinedCommunities')
    #TODO:Update this string.

    def __str__(self)-> str:
        data = {
            "id": self.id,
            "name": self.name,
            "moderator_name": self.moderator.firstname,
            "numUsers": self.numUsers,
            "numPosts": self.numPosts,
            "isPrivate": self.isPrivate
        }
        return data

class PostTemplate(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    name=models.CharField(max_length=50, verbose_name='Name')
    description = models.TextField(max_length=max, verbose_name='Description')
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='post_templates') #A post can be in only one community.
    
    def __str__(self) -> str:
        dataFields=self.dataFieldTemplates.all()
        dataFieldDict={}
        for d in dataFields:
            dataFieldDict[d.id]=d._str_()
        
        data = {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "data_field_temps": json.dumps(self.dataFieldDict)
        }
        return data

class Post(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    posterid = models.IntegerField()
    title = models.CharField(max_length=50, verbose_name='Title')
    description = models.TextField(max_length=max, verbose_name='Description')
    createdDate = models.DateTimeField(
        auto_now_add=True, verbose_name="Created Date")
    postTemplate=models.ForeignKey(PostTemplate, on_delete=models.CASCADE)
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='posts') #A post can be in only one community.
    
    def __str__(self) -> str:
        dataFields=self.dataFields.all()
        dataFieldDict={}
        for d in dataFields:
            dataFieldDict[d.id]=d._str_()
        
        data = {
            "id": self.id,
            "posterid": self.posterid,
            "title": self.title,
            "description": self.description,
            "date": self.createdDate,
            "dataFields":json.dumps(self.dataFieldDict)
        }
        return data

class DataField(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    post=models.ForeignKey(Post, on_delete=models.CASCADE, related_name='dataFields')
    name=models.CharField(max_length=50, verbose_name='Name')
    type=models.CharField(max_length=50, verbose_name='Type')
    content=models.JSONField(max_length=max, verbose_name='Data')
    def __str__(self) -> str:
        data = {
            "id": self.id,
            "post":self.post,
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
    postTemplate=models.ForeignKey(PostTemplate, on_delete=models.CASCADE, related_name='dataFieldTemplates')
    def __str__(self) -> str:
        data = {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "form_content": self.form_content
        }
        return data

