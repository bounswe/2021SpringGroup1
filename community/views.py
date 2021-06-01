from django.shortcuts import render
from django.core.serializers import serialize
from django.views import View
from django.http import HttpResponse
from django.http import JsonResponse

from .models import Community
from .models import Post
from .models import User

import requests
import json

NUM_SUGGESTIONS = 5  # Number of image suggestions to be forwarded.
# Google image search api.
API_KEY = 'AIzaSyDiHo8_fujA_TscMA9tVhQjb08biazRV0A'
CX = 'b53774e143a6ec2c1'
# Search string after this.
SEARCH_API = 'https://www.googleapis.com/customsearch/v1?key=' + \
    str(API_KEY) + '&cx=' + CX + '&q='

#TODO: Implement following functions.
# Add user to community
# Remove user from community.
# Add post to community.
# Remove post from community.


def createCommunity(req):
    community = Community()
    community.name = req.GET["name"]
    community.isPrivate = req.GET["isPrivate"]
    moderator_name = req.GET["moderator"]
    user = User(name=moderator_name)
    community.moderator = user
    #Create the first post of the community.
    post = Post()
    post.title = "Default first post!"
    post.text = "Write some content here!"
    post.community = community
    community.numUsers = 1
    community.numPosts = 1
    user.save()
    community.save()
    post.save()
    # posts = community.posts.all()
    # print(community.posts.all())
    return HttpResponse(community, content_type="application/json")


def deleteCommunity(req):
    name_del = req.GET["name"]
    to_delete = Community.objects.filter(name=name_del)
    #TODO: Delete the posts in this community.
    to_delete.delete()
    return HttpResponse(to_delete, content_type="application/json")


def getFirst(req):
    query_set = Community.objects.all().values(
        'name', 'moderator', 'numUsers', 'isPrivate')
    list_of_dicts = list(query_set)
    data = json.dumps(list_of_dicts[0])
    return HttpResponse(data, content_type="application/json")


def getLast(req):
    query_set = Community.objects.all().values(
        'name', 'moderator', 'numUsers', 'isPrivate')
    list_of_dicts = list(query_set)
    data = json.dumps(list_of_dicts[-1])
    return HttpResponse(data, content_type="application/json")


def getAll(req):
    query_set = Community.objects.all().values(
        'name', 'moderator', 'numUsers', 'isPrivate')
    list_of_dicts = list(query_set)
    data = json.dumps(list_of_dicts)
    return HttpResponse(data, content_type="application/json")


def getSuggestions(req):
    list_of_images = []
    list_of_urls = []

    name = req.GET["name"]
    res = requests.get(SEARCH_API + name)
    myJson = res.content.decode('utf8')
    data = json.loads(myJson)
    dataPretty = json.dumps(data, indent=2)
    print(dataPretty)

    items = data["items"]    # Only interested in the found images.
    for value in items:
        pagemap = value["pagemap"]
        if ("cse_thumbnail" in pagemap):            # Get thumbnail if exists.
            thumbnail = pagemap["cse_thumbnail"]
            # Get full-res image if exists.
            if ("imageobject" in pagemap):
                image = pagemap["imageobject"]
            else:
                image = pagemap["cse_thumbnail"]
            list_of_images.append(image)
        else:
            continue
    #     print(thumbnail)
    #     print(image)
    # print("Result:")
    # print(list_of_images)

    # Create a response using the data from 3rd party API and return it.
    for img in list_of_images:
        # Either 'url' or 'src' must be in every image.
        if ("src" in img[0]):
            list_of_urls.append(img[0]["src"])
        elif("url" in img[0]):
            list_of_urls.append(img[0]["url"])
    response = {}
    response["query"] = name            # The searched string
    # Resulting images to be shown.
    response["images"] = list_of_urls[:NUM_SUGGESTIONS]
    return JsonResponse(response)
