from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.core.serializers import serialize
from django.views import View
from django.http import HttpResponse
from django.http import JsonResponse

from .models import *
import random
import urllib
import requests
import json
import isodate
import ast
NUM_SUGGESTIONS = 5  # Number of image suggestions to be forwarded.
# Google image search api.
API_KEY = 'AIzaSyDiHo8_fujA_TscMA9tVhQjb08biazRV0A'
CX = 'b53774e143a6ec2c1'
# Search string after this.
SEARCH_API = 'https://www.googleapis.com/customsearch/v1?key=' + \
    str(API_KEY) + '&cx=' + CX + '&q='
YOUTUBE_API_KEY='AIzaSyAGiNnRprjzxUGBj0ANdhZSg6ym2Zx4lf4'
VIDEO_CHECK_API='https://www.googleapis.com/youtube/v3/videos'
CAT_FACT = 'https://catfact.ninja/fact'

# Detect Language API key
DETECT_LANGUAGE_KEY="10721f4865e0bf2914dee88d7a91c265"
# Detect Language URL
DETECT_LANGUAGE_BASE_URL = "https://ws.detectlanguage.com/0.2/detect/"


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
    return render(request, "mainapp/viewPost.html", {"post": post})


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
            return JsonResponse({"success": False})


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
        if "community_id" in req.session:
            community_id = req.session["community_id"]
        elif "community_id" in req.GET:
            community_id = req.GET["community_id"]
        currentCommunity = Community.objects.get(pk=community_id)
        if not currentCommunity:
            return JsonResponse({})
        if currentCommunity.isPrivate:
            if "id" in req.session:
                user_id = req.session["id"]
            else:
                return JsonResponse({})
            user = Person.objects.get(pk=user_id)
            if not user in currentCommunity.joinedUsers.all():
                return JsonResponse({})
        
        postsDict = {}
        i = 1
        for post in currentCommunity.posts.all():
            postsDict[i] = post.__str__()
            i += 1
           
        return JsonResponse(postsDict)
      


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


def getGifs(req):
    if req.method == "GET":
        GIF_SEARCH_API = "http://api.giphy.com/v1/gifs/search?q=leave&api_key=u35Tzaaf2qEPKp2vXpBCnsvpBE1ZxpFj&limit=3"

        res = requests.get(GIF_SEARCH_API)
        myJson = res.content.decode('utf8')
        data = json.loads(myJson)
        dataPretty = json.dumps(data, indent=2)
        files = data["data"]
        image_url = []
        for item in files:
            image_url.append(item["images"]["original"]["url"])

        response = {}
        randomNumber = random.randint(0,2)
        response["images"] = image_url[randomNumber]
        return JsonResponse(response)
    else:
        return JsonResponse({})


def getCommunityTemplates(request):
    if request.method == "GET":
        if "community_id" in request.session:
            community_id = request.session["community_id"]
        elif "community_id" in request.GET:
            community_id=request.GET["community_id"]
        else:
            return JsonResponse({})
        currentCommunity = Community.objects.get(pk=community_id)
        if not currentCommunity:
            return JsonResponse({})
        if currentCommunity.isPrivate:
            if "id" in request.session:
                user_id = request.session["id"]
                user = Person.objects.get(pk=user_id)
                if not user in community.joinedUsers.all():
                    return JsonResponse({})
            else:
                return JsonResponse({})
        
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
        isValidRequest=True
        if not "template_name" in request.POST:
            return JsonResponse({"Error":"Bad request."})
        if not "description" in request.POST:
            return JsonResponse({"Error":"Bad request."})
        if not "data_field_temps" in request.POST:
            return JsonResponse({"Error":"Bad request."})

        templateName = request.POST["template_name"]
        templateDesc = request.POST["description"]
        data_field_temps = request.POST["data_field_temps"]
        try:
            dataFieldTempsData = json.loads(request.POST["data_field_temps"])
        except ValueError as e:
            return JsonResponse({"Error":"data_field_temps is in wrong format."})
        
        newTemplate = PostTemplate()
        newTemplate.name = templateName
        newTemplate.description = templateDesc
        
        if "community_id" in request.session:
            newTemplate.community = Community.objects.get(
            pk=request.session["community_id"])
        else:
            return JsonResponse({})
        
        if PostTemplate.objects.filter(name=templateName,community=newTemplate.community):
            return JsonResponse({"Error":"Template name is already in use."})
        
        
        

        
        
        newTemplate.save()
        candidateFieldNames=[]
        index=1
        for i in dataFieldTempsData:
            newFieldTemp = DataFieldTemp()
            if not "name" in i:
                isValidRequest=False
                break
            if not "type" in i:
                isValidRequest=False
                break
            newFieldTemp.name = i["name"]
            newFieldTemp.type = i["type"]
            if not newFieldTemp.type in ["text","image","video"]:
                isValidRequest=False
                break
            if newFieldTemp.name in candidateFieldNames:
                isValidRequest=False
                break
            newFieldTemp.form_content = {}
            newFieldTemp.postTemplate = newTemplate
            newFieldTemp.save()
        if not isValidRequest:
            newTemplate.delete()
            return JsonResponse({"Error":"Somethings gone wrong with field names."})
        
    return JsonResponse(newTemplate.__str__())


def createPost(request):
    if request.method == "POST":
        isValidRequest=True
        if not "title" in request.POST:
            return JsonResponse({"Error":"Bad request."})
        if not "description" in request.POST:
            return JsonResponse({"Error":"Bad request."})
        if not "post_template_id" in request.POST:
            return JsonResponse({"Error":"Bad request."})
        
        title = request.POST["title"]
        description = request.POST["description"]
        postTempID = request.POST["post_template_id"]
        post = Post()
        postTemp = PostTemplate.objects.get(pk=postTempID)
        temps = postTemp.dataFieldTemplates.all()
        
        if "community_id" in request.session:
            post.community = Community.objects.get(
            pk=request.session["community_id"])
        else:
            post.community=postTemp.community
        if "id" in request.session:
            post.posterid = request.session["id"]
        else:
            return JsonResponse({"Error":"Bad request."})
        
        post.title = title
        post.description = description
        post.postTemplate = postTemp
        post.save()

        allText = title + " " + description
        for temp in temps:
            newField = DataField()
            newField.name = temp.name
            newField.post = post
            newField.type = temp.type
            contentDict = {}
            if temp.type == "text":
                if str(temp.id)+"_textcontent" in request.POST:
                    contentDict["text"] = request.POST[str(temp.id)+"_textcontent"]
                    allText = allText + " " + request.POST[str(temp.id)+"_textcontent"]
                else:
                    isValidRequest=False
                    break
            elif temp.type == "image":
                if str(temp.id)+"_urlcontent" in request.POST:
                    contentDict["url"] = request.POST[str(temp.id)+"_urlcontent"]
                else:
                    isValidRequest=False
                    break
            elif temp.type == "video":
                if str(temp.id)+"_urlcontent" in request.POST:
                    contentDict["url"] = request.POST[str(temp.id)+"_urlcontent"]
                else:
                    isValidRequest=False
                    break
            else:
                isValidRequest=False
                break
            newField.content = contentDict
            newField.save()
        if not isValidRequest:
            post.delete()
            return JsonResponse({})
        myResponse= requests.post(str(DETECT_LANGUAGE_BASE_URL), auth=(str(DETECT_LANGUAGE_KEY),'12345'), data={'q':allText})
        if not myResponse.ok:
            return JsonResponse(post.__str__())
        
        resultsJson = myResponse.json()
        languageList= []
        
        for element in resultsJson['data']['detections']:
            languageList.append(element['language'])
        languagesString = ','.join(languageList)

        languageField = DataField()
        languageField.name= 'Detected languages'
        languageField.post = post
        languageField.type = 'text'
        contentDict= {}
        contentDict["text"] = languagesString
        languageField.content= contentDict
        languageField.save()
        
        return JsonResponse(post.__str__())


def getPost(req):
    if req.method == "GET":
        if "post_id" in req.GET:
            post = Post.objects.get(pk=req.GET["post_id"])
            if not post:
                return JsonResponse({})
        else:
            return JsonResponse({})
        if post.community.isPrivate:
            if "id" in req.session and "community_id" in req.session:
                user = Person.objects.get(pk=req.session["id"])
                community = Community.objects.get(pk=req.session["community_id"])
                if not user in community.joinedUsers.all():
                    return JsonResponse({})
        return JsonResponse(post.__str__())
     

def getPostTemplate(req):
    if req.method == "GET":
        if "template_id" in req.GET:
            postTemplate = PostTemplate.objects.get(pk=req.GET["template_id"])
            if not postTemplate:
                return JsonResponse({})
        else:
            return JsonResponse({})
        if postTemplate.community.isPrivate:
            if "id" in req.session and "community_id" in req.session:
                user = Person.objects.get(pk=req.session["id"])
                community = Community.objects.get(pk=req.session["community_id"])
                if not user in community.joinedUsers.all():
                    return JsonResponse({})
        return JsonResponse(postTemplate.__str__())


def checkVideo(req):
    if req.method == "GET":
        if "url" in req.GET:
            url = req.GET["url"]
        else:
            return JsonResponse({"isValid":False,"Reason":"GET parameters are not valid."})
        res = requests.get(VIDEO_CHECK_API + "?part=contentDetails,status&id="+url+"&key="+YOUTUBE_API_KEY)
        if not res.ok:
            return JsonResponse({"isValid":False,"Reason":"Youtube API returned bad response."})
        myJson = res.content.decode('utf8')
        data = json.loads(myJson)
        if data["items"]:
            videoData=data["items"][0]
            videoDurationStr=videoData["contentDetails"]["duration"]
            strIndex=len(videoDurationStr)-1
            duration=isodate.parse_duration(videoDurationStr)
            
            if not videoData["status"]["embeddable"]:
                return JsonResponse({"isValid":False,"Reason":"Video is not embeddable."})
            elif not videoData["status"]["privacyStatus"]=="public":
                return JsonResponse({"isValid":False,"Reason":"Video is private."})
            elif videoData["contentDetails"]["contentRating"]=="ytAgeRestricted":
                return JsonResponse({"isValid":False,"Reason":"Video is age restricted."})
            elif duration.total_seconds()>301:
                return JsonResponse({"isValid":False,"Reason":"Video is longer than 5 minutes."})
            return JsonResponse({"isValid":True,"Reason":""})
        else:
            return JsonResponse({"isValid":False,"Reason":"Video is not found."})

        
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
    if req.method=="GET":
        if "id" in req.session:
            user_id = req.session["id"]
        elif "user_id" in req.GET:
            user_id=req.GET["user_id"]
        else:
            return JsonResponse({})
        user = Person.objects.get(pk=user_id)
        if not user:
            return JsonResponse({})
        joinedCommunities = user.joinedCommunities.all()
        communityDict = {}
        i = 1
        for c in joinedCommunities:
            communityDict[i] = c.__str__()
            i += 1
        return JsonResponse(communityDict)
