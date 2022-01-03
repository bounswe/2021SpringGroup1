from django.shortcuts import render
from .serializers import ActivityStreamSerializer

def saveActivity(summary=None,type=None,actor=None,object=None, success=None, *args, **kwargs):
    data = {
        'summary': summary,
        'type': type,
        'actor': actor,
        'object': object,
        'success': success,
    }

    serializer = ActivityStreamSerializer(data=data)
    if serializer.is_valid(): 
        serializer.save()
