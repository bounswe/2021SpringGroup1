from rest_framework import serializers
from .models import ActivityStream

class ActivityStreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityStream
        fields = ['summary','actor','date','object','type', 'url','success']
        read_only_fields = []

    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super(ActivityStream, self).get_serializer(*args, **kwargs)