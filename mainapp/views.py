from django.http.response import HttpResponseRedirect
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
CAT_FACT = 'https://catfact.ninja/fact'


def mainPage(req):
    if "community_id" in req.session.keys():
        del req.session["community_id"]
    # TODO: Update Html file

    # @yunus-topal if something goes wrong, delete this if block to get rid of logout feature.
    if "logout" in req.POST:
        req.session.flush()
        return HttpResponseRedirect("../")

    context = {
        "personfirst": req.session["firstname"],
        "personlast": req.session["lastname"],
    }
    return render(req, "mainapp/homePage.html", context)


def createPerson(req):
    if req.method == 'GET':
        response = requests.get(CAT_FACT)
        nicefact = response.json()
        return render(req, "mainapp/createPerson.html", {"fact": nicefact["fact"]})
    elif req.method == 'POST':
        person = Person()
        person.title = req.POST["lastname"] + " title"
        person.firstname = req.POST["firstname"]
        person.lastname = req.POST["lastname"]
        person.location = req.POST["location"]
        person.email = req.POST["email"]
        person.age = req.POST["age"]
        person.phone = req.POST["phone"]
        person.imageUrl = req.POST["imgurl"]
        person.save()
        return HttpResponseRedirect("../")


def createCommunity_ui(req):
    # TODO: Update Html file
    context = {
        "personfirst": req.session["firstname"],
        "personlast": req.session["lastname"],
    }
    return render(req, "mainapp/createCommunity.html", context)


def viewCommunity_ui(req):
    user_id = req.session["id"]
    user = Person.objects.get(pk=user_id)
    community_id = req.GET["id"]
    req.session["community_id"] = community_id
    currentCommunity = Community.objects.get(pk=community_id)
    isMember = (user in currentCommunity.joinedUsers.all())
    isModerator = (currentCommunity.moderator == user)
    # TODO: Update Html file
    return render(req, "mainapp/viewCommunity.html", {"user_id": user_id, "name": currentCommunity.name, "description": currentCommunity.description, "isMember": isMember, "isModerator": isModerator})


def deleteCommunity_ui(req):
    return render(req, "mainapp/deleteCommunity.html")
# TODO: This file should be removed.


def getSuggestions_ui(req):
    return render(req, "community/getSuggestions.html")


def createPost_ui(request):
    template = PostTemplate.objects.get(pk=request.GET["template_id"])
    return render(request, "mainapp/createPost.html", {"personfirst": request.session["firstname"], "personlast": request.session["lastname"], "data_field_temps": list(template.dataFieldTemplates.all()), "template_id": request.GET["template_id"]})


def createPostTemplate_ui(request):
    return render(request, "mainapp/createPostTemplate.html")


def viewPost_ui(request):
    post = Post.objects.get(pk=request.GET["id"])
    post.dataFields.all()
    return render(request, "mainapp/viewPost.html", {"post": post, "data_fields": list(post.dataFields.all())})


def leaveCommunity_ui(req):
    # TODO: Update Html file
    if req.method == "GET":
        user_id = req.session["id"]
        user = Person.objects.get(pk=user_id)
        community_id = req.session["community_id"]
        currentCommunity = Community.objects.get(pk=community_id)
        context = {
            "personfirst": req.session["firstname"],
            "personlast": req.session["lastname"],
        }
        if user in currentCommunity.joinedUsers.all():
            user.joinedCommunities.remove(currentCommunity)
            return render(req, "mainapp/leaveCommunity.html", context)
        else:
            return render(req, "mainapp/leaveCommunity.html", context)


def createCommunity(req):

    if Community.objects.filter(name=req.GET["name"]):
        return JsonResponse({})
    if req.method == "POST":
        community = Community()
        community.name = req.GET["name"]
        community.isPrivate = (
            req.GET["isPrivate"] == "true")  # Cast to boolean
        community.moderator = Person.objects.get(pk=req.session["id"])
        community.numUsers = 1
        community.numPosts = 0
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
    if req.method == "GET":
        user_id = req.session["id"]
        user = Person.objects.get(pk=user_id)
        community_id = req.session["community_id"]
        currentCommunity = Community.objects.get(pk=community_id)
        if not currentCommunity.isPrivate:
            user.joinedCommunities.add(currentCommunity)
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False, "Error Message": "This community is private. You can not join without invitation."})


def leaveCommunity(req):
    if req.method == "POST":
        user_id = req.session["id"]
        user = Person.objects.get(pk=user_id)
        community_id = req.session["community_id"]
        currentCommunity = Community.objects.get(pk=community_id)
        if user in currentCommunity.joinedUsers.all():
            user.joinedCommunities.remove(currentCommunity)
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False})


def getAllPostsOfCommunity(req):
    if req.method == "GET":
        user_id = req.session["id"]
        user = Person.objects.get(pk=user_id)
        community_id = req.session["community_id"]
        currentCommunity = Community.objects.get(pk=community_id)
        postsDict = {}
        i = 1
        for post in currentCommunity.posts.all():
            postsDict[i] = post.__str__()
            i += 1
        if user in currentCommunity.joinedUsers.all():
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
            # Get thumbnail if exists.
            if ("cse_thumbnail" in pagemap):
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
    if request.method == "GET":
        community_id = request.session["community_id"]
        currentCommunity = Community.objects.get(pk=community_id)
        templates = currentCommunity.post_templates.all()
        templatesDict = {}
        i = 1
        for template in templates:
            templatesDict[i] = template.__str__()
            i += 1
        return JsonResponse(templatesDict)
    else:
        return JsonResponse({})


def createPostTemplate(request):
    if request.method == "POST":
        templateName = request.POST["template_name"]
        templateDesc = request.POST["description"]
        data_field_temps = request.POST["data_field_temps"]
        dataFieldTempsData = json.loads(request.POST["data_field_temps"])

        newTemplate = PostTemplate()
        newTemplate.name = templateName
        newTemplate.description = templateDesc
        newTemplate.community = Community.objects.get(
            pk=request.session["community_id"])
        newTemplate.save()

        for i in dataFieldTempsData:
            newFieldTemp = DataFieldTemp()
            newFieldTemp.name = i["value"]["name"]
            newFieldTemp.type = i["value"]["type"]
            newFieldTemp.form_content = {}
            newFieldTemp.postTemplate = newTemplate
            newFieldTemp.save()
        newTemplate.save()
    return HttpResponse(JsonResponse(newTemplate.__str__()))


def createPost(request):
    if request.method == "POST":
        title = request.POST["title"]
        description = request.POST["description"]
        postTempID = request.POST["post_template_id"]
        post = Post()
        postTemp = PostTemplate.objects.get(pk=postTempID)
        temps = postTemp.dataFieldTemplates.all()
        post.community = Community.objects.get(
            pk=request.session["community_id"])
        post.posterid = request.session["id"]
        post.title = title
        post.description = description
        post.postTemplate = postTemp
        post.save()
        for temp in temps:
            newField = DataField()
            newField.name = temp.name
            newField.post = post
            newField.type = temp.type
            contentDict = {}
            if temp.type == "text":
                contentDict["text"] = request.POST[str(temp.id)+"_textcontent"]
            elif temp.type == "image":
                contentDict["url"] = request.POST[str(temp.id)+"_urlcontent"]
            elif temp.type == "video":
                contentDict["url"] = request.POST[str(temp.id)+"_urlcontent"]
            newField.content = contentDict
            newField.save()
        post.save()
        return JsonResponse(post.__str__())
    else:
        title = request.GET["title"]
        description = request.GET["description"]
        postTempID = request.POST["post_template_id"]
        post = Post()
        postTemp = PostTemplate.objects.filter(id=postTempID)[0]
        temps = postTemp[0].dataFieldTemplates.all()
        for temp in temps:
            newField = DataField()
            newField.name = temp.name
            newField.post = post
            newField.type = temps.type
            newField.content = request.GET[temp.id+"_content"]
            newField.save()
        post.community = Community.objects.get(
            pk=request.session["community_id"])
        post.posterid = request.session["id"]
        post.title = title
        post.description = description
        post.postTemplate = postTemp
        post.save()
        return JsonResponse(post.__str__())


def getPost(req):
    if req.method == "GET":
        post = Post.objects.get(pk=req.GET["post_id"])
        user = Person.objects.get(pk=req.session["id"])
        community = Community.objects.get(pk=req.session["community_id"])
        if post.community == community:
            return JsonResponse(post.__str__())
        else:
            return JsonResponse({})


def getDataFieldsOfPost(req):
    pass


def getDataFieldTempsOfTemplate(req):
    pass


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
    user_id = req.session["id"]
    user = Person.objects.get(pk=user_id)
    joinedCommunities = user.joinedCommunities.all()
    communityDict = {}
    i = 1
    for c in joinedCommunities:
        communityDict[i] = c.__str__()
        i += 1
    return JsonResponse(communityDict)
