from django.db import models
from person.models import Person

# Create your models here.
class PostTemplate(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    name=models.CharField(max_length=50, verbose_name='Name')
    description = models.TextField(max_length=max, verbose_name='Description')
    data_field_temps=models.JSONField(max_length=max, verbose_name='DataFieldTemps',default='{}')
    def __str__(self) -> str:
        data = {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "data_field_temps": self.data_field_temps
        }
        return data

class Post(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    posterid = models.IntegerField()
    title = models.CharField(max_length=50, verbose_name='Title')
    description = models.TextField(max_length=max, verbose_name='Description')
    createdDate = models.DateTimeField(
        auto_now_add=True, verbose_name="Created Date")
    dataFields=models.JSONField(max_length=max, verbose_name='Data',default='{}')
    postTemplate=models.ForeignKey(PostTemplate, on_delete=models.CASCADE)
    
    #def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
    #    dataFieldDict = json.loads(self.dataFields)
    #    if not dataFieldDict:
    #        self.dataFields = '{}'
    #    else:
    #        self.dataFields = json.dumps(data_dict)
    #    return super().save(force_insert=force_insert, force_update=force_update, using=using, update_fields=update_fields)
    
    def __str__(self) -> str:
        data = {
            "id": self.id,
            "posterid": self.posterid,
            "title": self.title,
            "description": self.description,
            "date": self.createdDate,
            "dataFields":self.dataFields
        }
        return data



class DataField(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    post=models.ForeignKey(Post, on_delete=models.CASCADE)
    name=models.CharField(max_length=50, verbose_name='Name')
    type=models.CharField(max_length=50, verbose_name='Type')
    content=models.JSONField(max_length=max, verbose_name='Data',default='{}')
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
    form_content=models.JSONField(max_length=max, verbose_name='Data',default='{}')
    postTemplate=models.ForeignKey(PostTemplate, on_delete=models.CASCADE)
    def __str__(self) -> str:
        data = {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "form_content": self.form_content
        }
        return data