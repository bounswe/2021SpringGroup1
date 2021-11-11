from django.core.checks.messages import Error
from django.db import models
from django.db.models.query import QuerySet
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from .models import Community, DataField, DataFieldTemp, Post, PostTemplate, User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth.models import Group
import json

def get_user_home_feed(req):
    if req.method == 'GET':
        if req.user.is_authenticated:
            communities=req.user.joined_communities.all()
            post_set=QuerySet()
            for community in communities:
                post_set.union(community.posts)
            ordered_set=post_set.order_by('created_date')
            post_array=[]
            for post in ordered_set.all():
                post_array.append(post.__str__())
            return JsonResponse(post_array)
        else:
            return JsonResponse({})


def get_post(req):
    if req.method == 'GET':
        if "id" in req.GET:
            post=Post.objects.get(pk=req.GET["id"])
            if post:
                return JsonResponse(post.__str__())
            else:
                return JsonResponse({})

def get_user_communities(req):
    if req.method == 'GET':
        if req.user.is_authenticated:
            communities=req.user.joined_communities.all()
            community_array=[]
            for community in communities:
                community_array.append(community.__str__())
            return JsonResponse(community_array)

def get_all_communities(req):
    if req.method == 'GET':
        communities=Community.objects.all()
        community_array=[]
        for community in communities:
            community_array.append(community.__str__())
        return JsonResponse(community_array)


#TODO: Berke
def try_create_post(req,community_id):
    if req.method=="POST":
        if req.user.is_authenticated:
            try:
                community=req.user.joined_communities.get(pk=community_id)
            except ObjectDoesNotExist:
                community=None
            if not community:
                return JsonResponse({"Success" : False,"Error": "User is not subscribed to this community."}) 
        else:
            return JsonResponse({"Success" : False,"Error": "User is not logged in."}) 
        

        if "title" in req.POST and "template_id" in req.POST and "data_fields" in req.POST:
            title=req.POST["title"]
            template_id=req.POST["template_id"]
            try:
                data_fields = json.loads(req.POST["data_fields"])
            except ValueError:
                return JsonResponse({"Success" : False,"Error": "Data fields are in wrong format."})
        else:
            return JsonResponse({})
        try:
            post_template=community.post_templates.get(pk=template_id)
        except ObjectDoesNotExist:
            post_template=None

        if post_template:
            data_field_templates=post_template.data_field_templates.all()
            field_value_pairs=[]
            for data_field_template in data_field_templates:
                try:
                    data_field_name=data_field_template.name
                    data_field_type=data_field_template.type
                    if isinstance(data_fields,str):
                        data_fields=json.loads(data_fields)
                    data_field_content=data_fields[str(data_field_template.id)+"_content"]
                    field_value_pairs.append((data_field_name,data_field_type,data_field_content))
                except KeyError:
                    return JsonResponse({"Success" : False,"Error": "Data fields are in wrong format."}) 
        else:
            return JsonResponse({"Success" : False,"Error": "Data fields are in wrong format."})
        try:
            post=Post(title=title,poster=req.user,post_template=post_template,community=community)
            post.save()
            for name,type,value in field_value_pairs:
                data_field=DataField(name=name,content=value,post=post,type=type)
                data_field.save()
        except InterruptedError:
            return JsonResponse({})
        
        return JsonResponse({"Success" : True, "Post" : json.dumps(post.__str__())})

#TODO: Berke
def try_create_post_template(req,community_id):
    if req.method=="POST":
        if req.user.is_authenticated:
            try:
                community=req.user.joined_communities.get(pk=community_id)
            except ObjectDoesNotExist:
                community=None

            if not community:
                return JsonResponse({"Success" : False})
            elif not req.user==community.moderator:
                return JsonResponse({"Success" : False})
        else:
            return JsonResponse({"Success" : False})
        
        if "title" in req.POST and "description" in req.POST and "data_field_temps" in req.POST:
            title=req.POST["title"]
            description=req.POST["description"]
            try:
                data_field_temps = json.loads(req.POST["data_field_temps"])
            except ValueError:
                return JsonResponse({"Success" : False,"Error": "Data field templates are in wrong format."})
            
            if not isinstance(data_field_temps,list):
                return JsonResponse({"Success" : False})
            data_field_temp_tuples=[]
            for data_field_temp in data_field_temps:
                # try:
                #     data_field_temp=json.loads(data_field_temp)
                # except ValueError:
                #     return JsonResponse({"Success" : False})
                required_keys=["name","type"]
                if not all(key in data_field_temp for key in required_keys):
                    return JsonResponse({"Success" : False})
                if not data_field_temp["type"] in ["text","image","video"]:
                    return JsonResponse({"Success" : False})
                data_field_temp_tuples.append((data_field_temp["name"],data_field_temp["type"]))
        else:
            return JsonResponse({"Success" : False})
        try:
            existing_titled_template=community.post_templates.get(name=title)
        except ObjectDoesNotExist:
            existing_titled_template=None

        if existing_titled_template:
            return JsonResponse({"Success" : False})
        post_template=PostTemplate(name=title,description=description,community=community)
        post_template.save()
        for name,type in data_field_temp_tuples:
            data_field_temp=DataFieldTemp(name=name,type=type,post_template=post_template)
            data_field_temp.save()
        
        return JsonResponse({"Success" : True, "PostTemplate" : json.dumps(post_template.__str__())})

#TODO: Emrah
def get_community_data(req,community_id):
    if req.method == 'GET':
        try:
            community = Community.objects.get(pk = community_id)
        except:
            return JsonResponse({"Success" : False, "Error": "Community is not found."})    
        
        return JsonResponse({"Success" : True, "Community": community.__str__()}) // {}
    return JsonResponse({"Success" : False, "Error": "Wrong request method."})

#TODO: Emrah
@csrf_exempt
def try_create_community(req):
    if req.method == 'POST':
        if req.user.is_authenticated:
            if check_required_fields(["name"], req):
                fields_ = Community.get_all_fields_names()
                kwargs_ = make_kwargs(fields_, req)
                kwargs_["moderator"]=req.user
                community_object = Community(**kwargs_)
                community_object.save()
                return JsonResponse({"Success" : True, "Community" : community_object.__str__()})
            return JsonResponse({"Success" : False, "Error":"Fill all required keys"})
        return JsonResponse({"Success" : False, "Error":"User is not signed in"})
    return JsonResponse({"Success" :False , "Error":"Wrong request method"})

def get_subscription_status(req,community_id):
    if req.method == 'GET':
        if req.user.is_authenticated:
            try:
                community = Community.objects.get(pk = community_id)
            except:
                return JsonResponse({"Success" : False, "Error": "Community is not found."})
            
            if community in req.user.joined_communities:
                return JsonResponse({"Success" : True, "IsJoined": True})
            else:
                return JsonResponse({"Success" : True, "IsJoined": False})
                        
        return JsonResponse({"Success":False, "Error": "User is not authenticated"})

#TODO: Emrah
def set_subscription_status(req,community_id):
    if req.method == 'POST':
        if "subscribe" in req.POST:
            if req.user.is_authenticated:
                try:
                    community = Community.objects.get(pk = community_id)
                except:
                    return JsonResponse({"Success" : False, "Error": "Community is not found."})
                if req.POST["subscribe"]:
                    if community in req.user.joined_communities:
                        return JsonResponse({"Success" : False, "Error": "User is already in community."})
                    else:
                        community.joined_users.add(req.user)
                        community.save()
                        return JsonResponse({"Success" : True, "IsJoined": True})
                else:
                    if community in req.user.joined_communities:
                        community.joined_users.remove(req.user)
                        community.save()
                        return JsonResponse({"Success" : True, "IsJoined": False})
                    else:
                        return JsonResponse({"Success" : False, "Error": "User is not in community."})

                            
            return JsonResponse({"Success":False, "Error": "User is not authenticated"})

#TODO: Emrah
def search_communities(req):
    if req.method == 'GET':
        if "name" in req.GET:
            communities = Community.objects.filter(name__icontains = req.GET["name"])
            if len(communities) == 0: return JsonResponse({"Success" : True, "Communities":[]})
            returned_fields = list(set(Community.get_all_fields_names()) - set(["moderator", "joined_users","posts", "post_templates", "created_date", "id"]))
            community_array = [get_field_values(returned_fields, community) for community in communities]
            return JsonResponse({"Success" : True, "Communities": community_array})
        return JsonResponse({"Success" : False, "Error": "'name' parameter is missing for search."})
        

def get_user_posts(req):
    if req.method == 'GET':
        if req.user.is_authenticated:
            posts=req.user.posts.order_by('created_date').all()
            post_array=[]
            for post in posts:
                post_array.append(post.__str__())
            return JsonResponse(post_array)


def check_required_fields(fields, request):
    return all(field in request.POST for field in fields)

def make_kwargs(fields, request):
    return {field: request.POST[field] for field in fields if field in request.POST}

def get_field_values(fields, object):
    return {field: getattr(object, field)for field in fields}