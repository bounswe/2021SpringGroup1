from django.db.models.query import QuerySet
from django.http import HttpResponse
from .models import Community, Post, User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

def get_user_home_feed(req):
    if req.method == 'GET':
        if req.user.is_authenticated:
            communities=req.user.communities.all()
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
            communities=req.user.communities.all()
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
def try_create_post(req):
    pass

#TODO: Berke
def try_create_post_template(req):
    pass

#TODO: Emrah
def get_community_data(req):
    pass

#TODO: Emrah
@csrf_exempt
def try_create_community(req):
    if req.method == 'POST':
        fields_ = Community.get_all_fields_names()
        if check_required_fields(Community.required_keys(), req):
            kwargs_ = make_kwargs(fields_, req)
            community_object = Community(**kwargs_)
            community_object.save()
            return JsonResponse({"message" : "success"})
    return JsonResponse({"message" : "Wrong request method"})

#TODO: Emrah
def set_subscription_status(req):
    pass

#TODO: Emrah
def search_communities(req):
    pass

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
