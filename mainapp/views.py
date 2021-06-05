from django.shortcuts import render
from django.core.serializers import serialize
from django.views import View
from django.http import HttpResponse
from django.http import JsonResponse

from .models import *


import requests
import json
import ast
NUM_SUGGESTIONS = 5  # Number of image suggestions to be forwarded.
# Google image search api.
API_KEY = 'AIzaSyDiHo8_fujA_TscMA9tVhQjb08biazRV0A'
CX = 'b53774e143a6ec2c1'
# Search string after this.
SEARCH_API = 'https://www.googleapis.com/customsearch/v1?key=' + \
    str(API_KEY) + '&cx=' + CX + '&q='


def mainPage(req):
    if "community_id" in req.session.keys():
        del req.session["community_id"]
    #TODO: Update Html file
    context={
        "personfirst":req.session["firstname"],
        "personlast":req.session["lastname"],
        }
    return render(req, "mainapp/homePage.html",context)


def createCommunity_ui(req):
    #TODO: Update Html file
     context={
        "personfirst":req.session["firstname"],
        "personlast":req.session["lastname"],
        }
     return render(req, "mainapp/createCommunity.html",context)

def viewCommunity_ui(req):
    user_id=req.session["id"]
    user=Person.objects.get(pk=user_id)
    community_id=req.GET["id"]
    req.session["community_id"]=community_id
    currentCommunity=Community.objects.get(pk=community_id)
    isMember=(user in currentCommunity.joinedUsers.all())
    isModerator=(currentCommunity.moderator==user)
    #TODO: Update Html file
    return render(req,"mainapp/viewCommunity.html",{"user_id":user_id,"name":currentCommunity.name,"description":currentCommunity.description,"isMember":isMember,"isModerator":isModerator})

def deleteCommunity_ui(req):
    return render(req, "mainapp/deleteCommunity.html")

def getSuggestions_ui(req):
    return render(req, "community/getSuggestions.html")

def createPost_ui(request,template_id):
    template=PostTemplate.objects.filter(id=template_id)[0]
    return render(request, "../createPost.html", {"personfirst": request.session["firstname"], "personlast": request.session["lastname"], "data_field_temps":template.data_field_temps})
def createPostTemplate_ui(request):
    return render(request,"mainapp/createPostTemplate.html");

def viewPost_ui(request,post_id):
    post=Post.objects.filter(id=post_id)
    return render(request,"post/viewPost.html",{"post":post})

def createCommunity(req):
    
    if Community.objects.filter(name=req.GET["name"]):
        return JsonResponse({})
    if req.method == "POST":
        community = Community()
        community.name = req.GET["name"]
        community.isPrivate = (req.GET["isPrivate"]=="true")    #Cast to boolean
        community.moderator= Person.objects.get(pk=req.session["id"])
        community.numUsers = 1
        community.numPosts=0
        community.save()
        community.joinedUsers.add(Person.objects.get(pk=req.session["id"]))
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

def joinCommunity(req):
    if req.method=="POST":
        user_id=req.session["id"]
        user=Person.objects.get(pk=user_id)
        community_id=req.sessions["community_id"]
        currentCommunity=Community.objects.get(pk=community_id)
        if not currentCommunity.isPrivate:
            user.joinedCommunities.add(currentCommunity)
            return JsonResponse({"success":True})
        else:
            return JsonResponse({"success":False})

def leaveCommunity(req):
    if req.method=="POST":
        user_id=req.session["id"]
        user=Person.objects.get(pk=user_id)
        community_id=req.sessions["community_id"]
        currentCommunity=Community.objects.get(pk=community_id)
        if user in currentCommunity.joinedUsers.all():
            user.joinedCommunities.remove(currentCommunity)
            return JsonResponse({"success":True})
        else:
            return JsonResponse({"success":False})

def getAllPostsOfCommunity(req):
    if req.method =="POST":
        user_id=req.session["id"]
        user=Person.objects.get(pk=user_id)
        community_id=req.sessions["community_id"]
        currentCommunity=Community.objects.get(pk=community_id)
        postsDict={}
        for post in currentCommunity.posts.all():
            postsDict[post.id]=post.__str__()
        if user in community.joinedUsers:
            return JsonResponse(postsDict)
        else:
            return JsonResponse({})

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

def getCommunityTemplates(request):
    if request.method=="GET":
        community_id=req.sessions["community_id"]
        currentCommunity=Community.objects.get(pk=community_id)
        templates=currentCommunity.post_templates.all()
        templatesDict={}
        for template in templates:
            templatesDict[template.id]=template.__str__()
        return JsonResponse(templatesDict.__str__())
    else:
        return JsonResponse({})

def createPostTemplate(request):
    if request.method == "POST":
        templateName=request.POST["template_name"]
        templateDesc=request.POST["description"]
        dataFieldTempsData=json.loads(request.POST["data_field_temps"])
        newTemplate=PostTemplate()
 
        for i in dataFieldTempsData:
            newFieldTemp=DataFieldTemp()
            newFieldTemp.name=dataFieldTempsData[i]["name"]
            newFieldTemp.type=dataFieldTempsData[i]["type"]
            newFieldTemp.postTemplate=newTemplate
            newFieldTemp.save()
        newTemplate.name=templateName
        newTemplate.description=templateDesc
        newTemplate.community=Community.objects.get(pk=req.session["community_id"])
        newTemplate.save()
    return HttpResponse(JsonResponse(newTemplate.__str__()))

def createPost(request):
    if request.method == "POST":
        title = request.POST["title"]
        description = request.POST["description"]
        postTempID=request.POST["post_template_id"]
        post = Post()
        postTemp=PostTemplate.objects.filter(id=postTempID)[0]
        temps=postTemp[0].dataFieldTemplates.all()
        for temp in temps:
            newField=DataField()
            newField.name=temp.name
            newField.post=post
            newField.type=temps.type
            newField.content=request.POST[temp.id+"_content"]
            newField.save()
        post.community=Community.objects.get(pk=req.session["community_id"])
        post.posterid = request.session["id"]
        post.title = title
        post.description = description
        post.postTemplate=postTemp
        post.save()
        return JsonResponse(post.__srt__())
    else:
        title = request.GET["title"]
        description = request.GET["description"]
        postTempID=request.POST["post_template_id"]
        post = Post()
        postTemp=PostTemplate.objects.filter(id=postTempID)[0]
        temps=postTemp[0].dataFieldTemplates.all()
        for temp in temps:
            newField=DataField()
            newField.name=temp.name
            newField.post=post
            newField.type=temps.type
            newField.content=request.GET[temp.id+"_content"]
            newField.save()
        post.community=Community.objects.get(pk=req.session["community_id"])
        post.posterid = request.session["id"]
        post.title = title
        post.description = description
        post.postTemplate=postTemp
        post.save()
        return JsonResponse(post.__srt__())

def getPost(req):
    if req.method=="GET":
        post=Post.objects.get(pk=req.GET["post_id"])
        #user=Person.objects.get(pk=req.session["id"])
        community=Community.objects.get(pk=req.session["community_id"])
        if post.community==community:
            return JsonResponse(post.__str__())
        else:
            return JsonResponse({})

def viewAllPosts(request):
    posts = Post.objects.all()
    if request.method == "GET":

        if "type" in request.GET:
            if "id" in request.GET:
                postid = request.GET["id"]
                post = Post.objects.filter(id=postid)
                return HttpResponse(JsonResponse(post[0].__str__()))
            allposts = {"post": []}
            for item in posts:
                post = item.__str__()
                allposts["post"].append(post)
            return HttpResponse(JsonResponse(allposts))

        return render(request, "post/viewAllPosts.html", {"personfirst": request.session["firstname"], "personlast": request.session["lastname"], "allposts": Post.objects.all()})
    if request.method == "POST":
        print(request.POST["like"])
        return render(request, "post/viewAllPosts.html", {"personfirst": request.session["firstname"], "personlast": request.session["lastname"], "allposts": Post.objects.all()})

def getAllCommunitiesOfUser(req):
    user_id=req.session["id"]
    user=Person.objects.get(pk=user_id)
    joinedCommunities=user.joinedCommunities.all()
    communityDict={}
    i=1
    for c in joinedCommunities:
        communityDict[i]=c.__str__()
        i+=1
    return JsonResponse(communityDict)


