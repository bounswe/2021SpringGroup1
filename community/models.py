from django.db import models

#TODO: Use the users from the other branch.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, verbose_name="Kullanıcı Adı")
    
    def __str__(self):
        data = {
            "id": self.id,
            "name": self.name,
        }
        return data

class Community(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, verbose_name="Topluluk Adı")
    moderator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='moderator') #A community has only one moderator.
    numUsers = models.IntegerField(verbose_name = "Kullanıcı Sayısı")
    numPosts = models.IntegerField(verbose_name = "Post Sayısı")
    isPrivate = models.BooleanField(verbose_name = "Private mı?")
    createdDate = models.DateTimeField(auto_now_add = True,verbose_name = "Oluşturulma tarihi")

    #TODO:Update this string.

    def __str__(self):
        data = {
            "id": self.id,
            "name": self.name,
            "moderator_name": self.moderator.name,
            "numUsers": self.numUsers,
            "numPosts": self.numPosts,
            "isPrivate": self.isPrivate
        }
        return data
        
#TODO: Use the posts from the other branch.
class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50, verbose_name="Post başlığı")
    text = models.TextField(verbose_name='İçerik')
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='posts') #A post can be in only one community.
    createdDate = models.DateTimeField(auto_now_add = True,verbose_name = "Oluşturulma tarihi")
    
    def __str__(self):
        data = {
            "id": self.id,
            "title": self.title,
            "text": self.text,
            "community_id": self.community.id
        }
        return data
    # community = models.ForeignKey(Community, on_delete = models.CASCADE, related_name='posts')




