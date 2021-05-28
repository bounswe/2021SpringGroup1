from django.db import models

# Create your models here.

class Person(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length = 50,verbose_name = "Ünvan")
    firstname = models.CharField(max_length = 50,verbose_name = "Ad")
    lastname = models.CharField(max_length = 50,verbose_name = "Soyad")
    location = models.CharField(max_length = 50,verbose_name = "Konum")
    email = models.EmailField(max_length=254,verbose_name = "Mail")
    age = models.IntegerField(verbose_name = "Yaş")
    phone = models.CharField(max_length = 12,verbose_name = "Telefon")
    imageUrl = models.CharField(max_length = 250,verbose_name = "Resim")
    createdDate = models.DateTimeField(auto_now_add = True,verbose_name = "Created Date")

    def __str__(self):
        return "Id: {} - Ünvan : {} - Ad : {} - Soyad: {} - Konum : {} - Email: {} - Yaş : {} - Telefon : {} - ResimUrl : {} - Oluşturulma Tarihi : {}".format(self.id,self.title,self.firstname,self.lastname,self.location,self.email,self.age,self.phone,self.imageUrl,self.createdDate)