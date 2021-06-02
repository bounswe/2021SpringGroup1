from django.http.response import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from . import routes
from .models import Post,PostTemplate,DataField,DataFieldTemp
from person.models import Person
import json
import ast
# Create your views here.


def mainPage(request):
    if request.method == "POST":
        if request.POST["post"] == "logout":
            request.session.flush()
            return HttpResponseRedirect("../")
    return render(request, "post2/mainPage.html", {"personfirst": request.session["firstname"], "personlast": request.session["lastname"]})

def viewTemplates(request):
    templates=PostTemplate.objects.all()
    return render(request,"post2/viewTemplates.html",{"personfirst": request.session["firstname"], "personlast": request.session["lastname"] , "alltemplates":templates})

def createPost(request,template_id):
    template=PostTemplate.objects.filter(id=template_id)[0]
    return render(request, "post2/createPost.html", {"personfirst": request.session["firstname"], "personlast": request.session["lastname"], "data_field_temps":template.data_field_temps})

def createPostTemplateName(request):
    return render(request, "post2/createPostTemplate1.html",{})

def createPostTemplateFieldInitial(request):
    if request.method=="POST":
        name= request.POST["template_name"]
        if PostTemplate.objects.filter(name=name):
            return HttpResponseRedirect("../createPostTemplate/name")
        context={
            "template_name" : request.POST["template_name"],
            "description" : request.POST["description"],
            "added_templates": {}
            }
        return render(request,"post2/createPostTemplate2.html",context)

def createPostTemplateAddField(request):
    if request.method=="POST":
        currentDict=ast.literal_eval(request.POST["data_field_temps"])
        newFieldName=request.POST["field_name"]
        newFieldType=request.POST["type"]
        newFieldFormContent=request.POST["form_content"]
        currentDict[newFieldName]={
            "name":newFieldName,
            "type":newFieldType,
            "form_content":newFieldFormContent
            }

        context={
            "template_name" : request.POST["template_name"],
            "description" : request.POST["description"],
            "added_templates": currentDict
            }
        return render(request,"post2/createPostTemplate2.html",context)

def createPostTemplatePage(request):
    context={
            "template_name" : request.POST["template_name"],
            "description" : request.POST["description"],
            "added_templates": ast.literal_eval(request.POST["data_field_temps"])
            }
    return render(request,"post2/createPostTemplate2.html",context)

def savePostTemplate(request):
    if request.method == "POST":
        templateName=request.POST["template_name"]
        templateDesc=request.POST["description"]
        str=json.dumps(ast.literal_eval(request.POST["data_field_temps"]))
        dataFieldTempsData=json.loads(str)
        newTemplate=PostTemplate()
        newTemplate.save()
        templateFields={}
        for i in dataFieldTempsData:
            newFieldTemp=DataFieldTemp()
            newFieldTemp.name=dataFieldTempsData[i]["name"]
            newFieldTemp.type=dataFieldTempsData[i]["type"]
            newFieldTemp.form_content=dataFieldTempsData[i]["form_content"]
            newFieldTemp.postTemplate=newTemplate
            newFieldTemp.save()
            templateFields[newFieldTemp.name]=newFieldTemp.__str__()
        newTemplate.name=templateName
        newTemplate.description=templateDesc
        newTemplate.data_field_temps=templateFields
        newTemplate.save()
    return HttpResponseRedirect("/post2")

def savePost(request):
    if request.method == "POST":
        title = request.POST["title"]
        description = request.POST["description"]
        postTempID=request.POST["post_template_id"]
        post = Post()
        postTemp=PostTemplate.objects.filter(id=postTempID)[0]
        temps=postTemp[0].data_field_temps
        dataFields={}
        for fieldName in temps:
            newField=DataField()
            newField.name=fieldName
            newField.post=Post.objects.filter(id=post.id)[0]
            newField.type=temps[fieldName]["type"]
            newField.content=request.POST[fieldName+"_content"]
            newField.save()
            dataFields[fieldName]=newField.__str__()
        
        post.posterid = request.session["id"]
        post.title = title
        post.description = description
        post.dataFields=dataFields
        post.postTemplate=postTemp
        post.save()
    else:
        title = request.GET["title"]
        description = request.GET["description"]
        postTempID=request.GET["post_template_id"]
        post = Post()
        postTemp=PostTemplate.objects.filter(id=postTempID)[0]
        temps=postTemp[0].data_field_temps
        dataFields={}
        for fieldName in temps:
            newField=DataField()
            newField.name=fieldName
            newField.post=Post.objects.filter(id=post.id)[0]
            newField.type=temps[fieldName]["type"]
            newField.content=request.GET[fieldName+"_content"]
            newField.save()
            dataFields[fieldName]=newField.__str__()
        
        post.posterid = request.session["id"]
        post.title = title
        post.description = description
        post.dataFields=dataFields
        post.postTemplate=postTemp
        post.save()
    return HttpResponseRedirect("/post2")

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

def viewPost(request,post_id):
    post=Post.objects.filter(id=post_id)
    return render(request,"post/viewPost.html",{"post":post})

