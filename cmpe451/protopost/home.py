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
