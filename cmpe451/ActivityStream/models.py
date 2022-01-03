from django.db import models

class ActivityStream(models.Model):
    context = models.TextField(default="https://www.w3.org/ns/activitystreams")
    actor = models.IntegerField(blank=True, null=True)
    summary = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)
    object = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    success = models.BooleanField(blank=True, null=True)
    