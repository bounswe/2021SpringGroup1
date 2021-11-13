from django.db.models import query
from django.shortcuts import render
from django.http import HttpResponse

from .home import *
from .register import *
from .serializers import *
from rest_framework.generics import GenericAPIView
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema, swagger_serializer_method

from drf_spectacular.utils import extend_schema,OpenApiParameter, inline_serializer
from drf_spectacular.types import OpenApiTypes

class Login(GenericAPIView):
    serializer_class=UserSerializer

    @extend_schema(
        parameters=[
          OpenApiParameter("username", OpenApiTypes.STR, OpenApiParameter.QUERY),
          OpenApiParameter("password", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ],
        request=UserSerializer,
        responses=None,
    )
    def get(self,req,format=None):
        user = authenticate(username=req.query_params["username"], password=req.query_params["password"])
        if user:
            login(req,user)
            return Response({"Success":True,"Message":"Successfully logged in."})
        else:
            return Response({"Success":False,"Message":"No user found."})

class Register(GenericAPIView):
    serializer_class=UserSerializer
    def post(self,req,format=None):
        user_serializer=UserSerializer(data=req.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({"Success":True,"Message":"Successfully registered."})
        else:
            return Response({"Success":False,"Message":user_serializer.errors})

class CreateCommunity(GenericAPIView):
    serializer_class=CommunitySerializer
    def post(self,req):
        if req.user.is_authenticated:
            community_serializer=CommunitySerializer(data=req.data)
            if community_serializer.is_valid():
                community=community_serializer.save(moderator=req.user)
                req.user.joined_communities.add(community)
                return Response({"Success":True, "Community": community_serializer.data})
            else:
                return Response({"Success":False, "Error": community_serializer.errors})

class CreatePost(GenericAPIView):
    serializer_class=PostSerializer 
    def post(self,req,community_id,format=None):
        if req.method=="POST":
            if req.user.is_authenticated:
                try:
                    community=req.user.joined_communities.get(pk=community_id)
                except:
                    return Response({"Success" : False,"Error": "User is not subscribed to this community."}) 
            else:
                return Response({"Success" : False,"Error": "User is not logged in."}) 
            post_serializer = PostSerializer(data=req.data)
            if post_serializer.is_valid():
                try:
                    post_serializer.save(poster=req.user,community=community)
                    return Response({"Success" : True, "Post" : post_serializer.data})
                except:
                    return Response({"Success" : False, "Error" : "Something went wrong, is field names unique?"})

            else:
                return Response({"Success" : False, "Error" : post_serializer.errors})

class CreatePostTemplate(GenericAPIView):
    serializer_class=PostTemplateSerializer
    def post(self,req,community_id):
        if req.user.is_authenticated:
            try:
                community=req.user.joined_communities.get(pk=community_id)
            except:
                return Response({"Success" : False,"Error": "User is not subscribed to this community."}) 
        post_template_serializer=PostTemplateSerializer(data=req.data)
        if post_template_serializer.is_valid():
            try:
                post_template_serializer.save(community=community)
                return Response({"Success" : True,"PostTemplate": post_template_serializer.data})
            except:
                return Response({"Success" : False, "Error" : "Something went wrong"})
        else:
            return Response({"Success" : False, "Error" : post_template_serializer.errors})

class GetCommunityData(GenericAPIView):
    serializer_class=CommunitySerializer
    @extend_schema(
        request=None,
    )
    def get(self,req,community_id):
        if req.user.is_authenticated:
            try:
                community = Community.objects.get(pk = community_id)
            except:
                return Response({"Success" : False, "Error": "Community is not found."})    
            return Response({"Success" : True, "Community": community.data})
        return Response({"Success" : False, "Error": "Wrong request method."})
      
class ListCommunities(GenericAPIView):
    serializer_class=CommunitySerializer
    queryset=Community.objects.all()
    @extend_schema(
        parameters=[
          OpenApiParameter("from", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ],
        request=None,
    )
    def get(self,req):
        if req.user.is_authenticated and "from" in req.GET:
            if req.GET["from"]=="all":
                communities=Community.objects.all()
                communities=CommunitySerializer(communities,many=True)
                return Response(communities.data)
            elif req.GET["from"]=="joined":
                communities=req.user.joined_communities.all()
                communities=CommunitySerializer(communities,many=True)
                return Response(communities.data,safe=False)
        return Response({"Success" : False, "Error": "Wrong request."})

class UserSubscriptionStatus(GenericAPIView):
    def get(self,req,community_id):
        if req.user.is_authenticated:
            try:
                community = Community.objects.get(pk = community_id)
            except:
                return Response({"Success" : False, "Error": "Community is not found."})
            
            if community in req.user.joined_communities:
                return Response({"Success" : True, "IsJoined": True})
            else:
                return Response({"Success" : True, "IsJoined": False})
                        
        return Response({"Success":False, "Error": "User is not authenticated"})
    
    def put(self,req,community_id):
        if req.user.is_authenticated:
            try:
                community = Community.objects.get(pk = community_id)
            except:
                return Response({"Success" : False, "Error": "Community is not found."})
            if req.POST["subscribe"]:
                if community in req.user.joined_communities:
                    return Response({"Success" : False, "Error": "User is already in community."})
                else:
                    community.joined_users.add(req.user)
                    community.save()
                    return Response({"Success" : True, "IsJoined": True})
            else:
                if community in req.user.joined_communities:
                    if community.moderator == req.user:
                        return Response({"Success" : False, "Error": "User is the moderator community."})
                    community.joined_users.remove(req.user)
                    community.save()
                    return Response({"Success" : True, "IsJoined": False})
                else:
                    return Response({"Success" : False, "Error": "User is not in community."})
        return Response({"Success":False, "Error": "User is not authenticated"})

class ListPostTemplates(GenericAPIView):
    serializer_class= PostTemplateSerializer
    def get(self,req, community_id):
        if req.user.is_authenticated or True:
            post_templates=PostTemplate.objects.filter(community_id=community_id)
            post_templates=PostTemplateSerializer(post_templates,many=True)
            return Response(post_templates.data)
            try:
                #return Response({"Success" : True, "Post_templates" : post_templates.__str__()})
                return Response({"Success" : True, "Post_templates" : post_templates})
            except:
                return Response({"Success" : False, "Error" : "There is no template"})
        return Response({"Success" : False, "Error": "No Authentication"})

class ListCommunityPosts(GenericAPIView):
    serializer_class= PostSerializer
    def get(self, req,community_id):
        if req.user.is_authenticated or True:
            #try:
            posts = Post.objects.filter(community_id = community_id)
            posts = PostSerializer(posts, many=True)
            return Response(posts.data)
            #except:
            #    return Response({"Success" : False, "Error": "Community or Post is not found."})
        return Response({"Success":False, "Error": "No Authentication"})



#TODO: Implementation required.
class ListUserCreatedPosts(GenericAPIView):
    def get(req):
        if req.user.is_authenticated:
            communities=req.user.joined_communities.all()
            post_set=QuerySet()
            for community in communities:
                post_set.union(community.posts)
            ordered_set=post_set.order_by('created_date')
            
            return JsonResponse(post_array)
        else:
            return JsonResponse({})



