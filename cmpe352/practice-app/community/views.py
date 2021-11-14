from django.shortcuts import render
from django.core.serializers import serialize
from django.views import View
from django.http import HttpResponse
from django.http import JsonResponse

from person.models import Person

import requests
import json

NUM_SUGGESTIONS = 5  # Number of image suggestions to be forwarded.
# Google image search api.
API_KEY = 'AIzaSyDiHo8_fujA_TscMA9tVhQjb08biazRV0A'
CX = 'b53774e143a6ec2c1'
# Search string after this.
SEARCH_API = 'https://www.googleapis.com/customsearch/v1?key=' + \
    str(API_KEY) + '&cx=' + CX + '&q='

# TODO: Implement following functions.
# Add user to community
# Remove user from community.
# Add post to community.
# Remove post from community.


def mainPage(req):
    return render(req, "community/index.html")

def getAllCommunitiesOfUser(req):
    user_id=req.session["id"]
    user=Person.objects.get(pk=user_id)
    str=json.dumps(user.joinedCommunities.all())
    return JsonResponse(str)

def createCommunity_ui(req):
    return render(req, "community/createCommunity.html")

def viewCommunity(req):
    user_id=req.session["id"]
    user=Person.objects.get(pk=user_id)
    community_id=req.GET["id"]
    currentCommunity=Community.objects.get(pk=community_id)
    isMember=(user in community.joinedUsers)
    isModerator=(community.moderator==user)
    return render

def getAllPostsOfCommunity(req):
    if req.method =="POST":
        user_id=req.session["id"]
        user=Person.objects.get(pk=user_id)
        community_id=req.GET["id"]
        currentCommunity=Community.objects.get(pk=community_id)
        if user in community.joinedUsers:
            return JsonResponse(currentCommunity.posts)
        else:
            return JsonResponse({})

def deleteCommunity_ui(req):
    return render(req, "community/deleteCommunity.html")

def getSuggestions_ui(req):
    return render(req, "community/getSuggestions.html")

def createCommunity(req):
    # TODO: add sanity check for the data.
    if Community.objects.filter(name=req.GET["name"]):
        return JsonResponse({})
    if req.method == "POST":
        community = Community()
        community.name = req.GET["name"]
        community.isPrivate = (req.GET["isPrivate"]=="true")    #Cast to boolean
        community.moderator= Person.object.get(req.session["id"])
        community.numUsers = 1
        user.save()
        community.save()
        return JsonResponse(community.__str__())
    else:
        return JsonResponse({})

def deleteCommunity(req):
    response = {}
    if req.method == "POST":
        name_del = req.GET["name"]
        # TODO:filter by unique id instead.
        to_delete = Community.objects.filter(name=name_del)
        list_of_dicts = list(to_delete)
        for community in list_of_dicts:
            response[community.id] = community.__str__()
        # TODO: Delete the posts in this community. update user info.
        to_delete.delete()
    else:
        None
    return JsonResponse(response)

def getFirst(req):
    if req.method == "GET":
        print(req.session["firstname"])
        query_set = Community.objects.all()
        list_of_dicts = list(query_set)
        first_community = list_of_dicts[0]
        return JsonResponse(first_community.__str__())
    else:
        return JsonResponse({})

def getLast(req):
    if req.method == "GET":
        query_set = Community.objects.all()
        list_of_dicts = list(query_set)
        last_community = list_of_dicts[-1]
        return JsonResponse(last_community.__str__())
    else:
        return JsonResponse({})

def getAll(req):
    if req.method == "GET":
        response = {}
        query_set = Community.objects.all()
        list_of_dicts = list(query_set)
        for community in list_of_dicts:
            response[community.id] = community.__str__()
        return JsonResponse(response)
    else:
        return JsonResponse({})

def getSuggestions(req):
    if req.method == "GET":
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
    else:
        return JsonResponse({})
