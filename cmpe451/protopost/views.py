from decimal import Context
from django.db.models import query
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import response

from .register import *
from .serializers import *
from rest_framework.generics import GenericAPIView
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import UpdateAPIView

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


from rest_framework.response import Response

from drf_spectacular.utils import extend_schema,OpenApiParameter, inline_serializer
from drf_spectacular.types import OpenApiTypes

class Login(ObtainAuthToken):
    @extend_schema(description= "The user logs in. As a response, the Success field and token are returned.",
        tags=["User"]
    )
    def post(self,req,format=None):
        user_serializer = self.serializer_class(data=req.data, context={'request': req})
        if user_serializer.is_valid():
            try:
                token = Token.objects.get(user=user_serializer.validated_data['user'])
            except:
                return Response({"Success":False,"Message":"No user found."})
            return Response({"Success":True,"Token":token.key})
        return Response({"Success":False})
            

class Register(GenericAPIView):
    serializer_class=UserSerializer
    @extend_schema(description= "The user registers to use the system.",
     responses=None,
     tags=["User"],
    )
    def post(self,req,format=None):
        user_serializer=UserSerializer(data=req.data)
        if user_serializer.is_valid():
            user=user_serializer.save()
            Token.objects.create(user=user)
            return Response({"Success":True,"Message":"Successfully registered."})
        else:
            return Response({"Success":False,"Message":user_serializer.errors})

class Logout(GenericAPIView):
    serializer_class=UserSerializer
    @extend_schema(
        request=None,
        responses=None,
        description="DEPRECATED: The user logs out.",
        tags=["User"]
    )
    def post(self,req,format=None):
        logout(req)
        return Response({"Message" : "Logged out successfully."})


class CreateCommunity(GenericAPIView):
    serializer_class=CommunitySerializer
    @extend_schema(description="The user creates the community. The information of the community created as a response is returned.",
    tags=["Community"])
    def post(self,req):
        if req.user.is_authenticated:
            community_serializer=CommunitySerializer(data=req.data)
            if community_serializer.is_valid():
                community=community_serializer.save(moderator=req.user)
                req.user.joined_communities.add(community)
                community_serializer=CommunitySerializer(community,context={"request":req})
                return Response({"Success":True, "Community": community_serializer.data})
            else:
                return Response({"Success":False, "Error": community_serializer.errors})
        return Response({"Success":False, "Error": "No authentication."})

class CreatePost(GenericAPIView):
    serializer_class=PostSerializer
    @extend_schema(
        description="Method for creating Post objects. Requires authentication. DataField objects must match the data fields of the Post Template object specified.",
        responses={
            "Success": inline_serializer("CreatePostSuccess",{"Success" : serializers.BooleanField(initial=True), "Post": PostSerializer()}),
            "Error": inline_serializer("CreatePostError",{"Success" : serializers.BooleanField(default=False), "Error": serializers.StringRelatedField()})
            
            },
        tags=["Posts"],
    )
    def post(self,req,community_id,format=None):
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
    @extend_schema(
        description="Method for creating Post Template objects. Requires authentication and the user requesting must be moderator of the community. Current accepted data types are 'text, image, date, location'.",
        responses={
            "Success": inline_serializer("CreatePostTemplateSuccess",{"Success" : serializers.BooleanField(initial=True), "PostTemplate": PostTemplateSerializer()}),
            "Error": inline_serializer("CreatePostTemplateError",{"Success" : serializers.BooleanField(default=False), "Error": serializers.StringRelatedField()})
            
            },
        tags=["Posts"],
    )
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
        description="Method for retrieving a community's data and its posts. Requires authentication.",
        responses={
            "Success": inline_serializer("GetCommunityDataSuccess",{"Success" : serializers.BooleanField(initial=True), "Community": CommunitySerializer(),"Posts":PostSerializer(many=True)}),
            "Error": inline_serializer("GetCommunityDataError",{"Success" : serializers.BooleanField(default=False), "Error": serializers.StringRelatedField()})
            
            },
        tags=["Community"],
    )
    def get(self,req,community_id):
        if req.user.is_authenticated:
            try:
                community = Community.objects.get(pk = community_id)
            except:
                return Response({"Success" : False, "Error": "Community is not found."})
            community=CommunitySerializer(community,context={"request":req})
            post_data=[]
            posts = Post.objects.filter(community_id = community_id)
            post_data = PostSerializer(posts, many=True).data
            return Response({"Success" : True, "Community": community.data, "Posts" : post_data})
        return Response({"Success":False, "Error": "No Authentication"})
        
      
class ListCommunities(GenericAPIView):
    serializer_class=CommunitySerializer
    queryset=Community.objects.all()
    @extend_schema(
        parameters=[OpenApiParameter("from", OpenApiTypes.STR, OpenApiParameter.QUERY)],
        request=None,
        description= "Lists communities. Takes 1 parameters. <br>from == 'all' returns all communities in the system. <br>from == 'joined' returns all communities of which the logged in user is a member.",
        tags=["Community"]
    )

    def get(self,req):
        if req.user.is_authenticated and "from" in req.GET:
            if req.GET["from"]=="all":
                communities=Community.objects.all()
                communities=CommunitySerializer(communities,many=True,context={"request":req})
                return Response({"Communities" : communities.data})
            elif req.GET["from"]=="joined":
                communities=req.user.joined_communities.all()
                communities=CommunitySerializer(communities,many=True,context={"request":req})
                return Response(communities.data)
        return Response({"Success" : False, "Error": "No authentication  or query parameter not  correctly."})

class UserSubscriptionStatus(GenericAPIView):
    serializer_class=UserSerializer
    @extend_schema(
        request=None,
        responses={
            "Success": inline_serializer("UserSubscriptionSuccess1",{"Success" : serializers.BooleanField(initial=True), "IsJoined": serializers.BooleanField()}),
            "Error": inline_serializer("UserSubscriptionError1",{"Success" : serializers.BooleanField(default=False), "Error": serializers.StringRelatedField()})
            
            },
        description="Method for retrieving subscription status of a given user.",
        tags=["User"],
    )
    def get(self,req,community_id):
        if req.user.is_authenticated:
            try:
                community = Community.objects.get(pk = community_id)
            except:
                return Response({"Success" : False, "Error": "Community is not found."})
            
            if community in req.user.joined_communities.all():
                return Response({"Success" : True, "IsJoined": True})
            else:
                return Response({"Success" : True, "IsJoined": False})
                        
        return Response({"Success":False, "Error": "User is not authenticated"})
    @extend_schema(
        parameters=[
          OpenApiParameter("action", OpenApiTypes.STR, OpenApiParameter.QUERY, description='Defines action, either "join" or "leave".',required=True),
        ],
        description="Method for setting subscription status of a given user.",
        request=None,
        responses={
            "Success": inline_serializer("UserSubscriptionSuccess2",{"Success" : serializers.BooleanField(initial=True), "IsJoined": serializers.BooleanField()}),
            "Error": inline_serializer("UserSubscriptionError2",{"Success" : serializers.BooleanField(default=False), "Error": serializers.StringRelatedField()})
            
            },
        tags=["User"],
    )
    def put(self,req,community_id):
        if req.user.is_authenticated:
            try:
                community = Community.objects.get(pk = community_id)
            except:
                return Response({"Success" : False, "Error": "Community is not found."})
            if not "action" in req.GET:
                return Response({"Success" : False, "Error": "Action is not defined."})
            if req.GET["action"]=="join":
                if community in req.user.joined_communities.all():
                    return Response({"Success" : False, "Error": "User is already in community."})
                else:
                    community.joined_users.add(req.user)
                    community.save()
                    return Response({"Success" : True, "IsJoined": True})
            elif req.GET["action"]=="leave":
                if community in req.user.joined_communities.all():
                    if community.moderator == req.user:
                        return Response({"Success" : False, "Error": "User is the moderator community."})
                    community.joined_users.remove(req.user)
                    community.save()
                    return Response({"Success" : True, "IsJoined": False})
                else:
                    return Response({"Success" : False, "Error": "User is not in community."})
            else:
                return Response({"Success" : False, "Error": "Action if not specified correctly."})
        return Response({"Success":False, "Error": "User is not authenticated"})

class ListPostTemplates(GenericAPIView):
    serializer_class= PostTemplateSerializer
    @extend_schema(
        request=None,
        description="Method for retrieving PostTemplate objects in a given community. Requires authentication.",
        responses={
            "Success": inline_serializer("ListTemplateSuccess",{"Success" : serializers.BooleanField(initial=True), "Post_templates": PostTemplateSerializer(many=True)}),
            "Error": inline_serializer("ListTemplateError",{"Success" : serializers.BooleanField(default=False), "Error": serializers.StringRelatedField()})
            
            },
        tags=["Posts"],
    )
    def get(self,req, community_id):
        if req.user.is_authenticated:
            try:
                post_templates=PostTemplate.objects.filter(community_id=community_id)
                post_templates=PostTemplateSerializer(post_templates,many=True)
                return Response({"Success" : True, "Post_templates" : post_templates.data})
            except:
                return Response({"Success" : False, "Error" : "There is no template or group"})
        return Response({"Success" : False, "Error": "No Authentication"})

class ListCommunityPosts(GenericAPIView):
    serializer_class= PostSerializer
    @extend_schema(
        request=None,
        description="Method for retrieving posts in a given community. Requires authentication.",
        responses={
            "Success": inline_serializer("ListCommunityPostsSuccess",{"Success" : serializers.BooleanField(initial=True), "Post_templates": PostTemplateSerializer(many=True)}),
            "Error": inline_serializer("ListCommunityPostsError",{"Success" : serializers.BooleanField(default=False), "Error": serializers.StringRelatedField()})
            
            },
        tags=["Posts"],
    )
    def get(self, req,community_id):
        if req.user.is_authenticated:
            try:
                posts = Post.objects.filter(community_id = community_id)
                posts = PostSerializer(posts, many=True)
                return Response(posts.data)
            except:
                return Response({"Success" : False, "Error": "Community or Post is not found."})
        return Response({"Success":False, "Error": "No Authentication"})


class GetUserHomeFeed(GenericAPIView):
    serializer_class= PostSerializer
    @extend_schema(description= "Returns posts in groups that the logged in user is a member of, in order from newest to oldest.",
    tags=["User"])
    def get(self,req):
        if req.user.is_authenticated:
            communities = req.user.joined_communities.all()
            communities=CommunitySerializer(communities,many=True,context={"request":req})
            
            result_posts,created_dates, post_counter, sorted_posts = [], {}, 0, []
            for community in communities.data:
                posts = Post.objects.filter(community_id = community["id"])
                posts = PostSerializer(posts, many=True).data
                for post in posts:
                    result_posts.append(post)
                    created_dates[post_counter] = post["created_date"]
                    post_counter += 1
            
            created_dates = sorted(created_dates.items(), key=lambda x: x[1], reverse=True)  
            sorted_posts = [result_posts[i[0]] for i in created_dates]

            return Response(sorted_posts)
        else:
            return Response({"Success":False, "Error": "No Authentication"})

class SearchPostsInCommunity(GenericAPIView):
    serializer_class=PostSerializer
    queryset=Post.objects.all()
    @extend_schema(
        parameters=[
          OpenApiParameter("text", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ],
        request=None,
        description="Method that returns posts that contain the given string in their title. Requires authentication.",
        responses={
            "Success": PostSerializer(many=True),
            "Error": inline_serializer("SearchPostsError",{"Success" : serializers.BooleanField(default=False), "Error": serializers.StringRelatedField()})
            
            },
        tags=["Posts"],
    )

    def get(self,req,community_id):
        if req.user.is_authenticated and "text" in req.GET:
            current_community=Community.objects.get(pk=community_id)
            posts = current_community.posts.filter(title__icontains = req.GET["text"])
            posts=PostSerializer(posts,many=True,context={"request":req})
            return Response(posts.data)    
        return Response({"Success" : False, "Error": "No authentication  or query parameter not  correctly."})

class SearchCommunities(GenericAPIView):
    serializer_class=CommunitySerializer
    queryset=Community.objects.all()
    @extend_schema(
        parameters=[
          OpenApiParameter("text", OpenApiTypes.STR, OpenApiParameter.QUERY),
        ],
        description= "Lists all Communities that contain the given parameter in their name.",
        request=None,
        tags=["Community"]
    )

    def get(self,req):
        if req.user.is_authenticated and "text" in req.GET:
            communities = Community.objects.filter(name__icontains = req.GET["text"])
            communities=CommunitySerializer(communities,many=True,context={"request":req})
            return Response(communities.data)    
        return Response({"Success" : False, "Error": "No authentication  or query parameter not  correctly."})

class GetUserCreatedPosts(GenericAPIView):
    serializer_class=PostSerializer
    @extend_schema(description= "Returns all posts created by the user.",tags=["User"])
    def get(self,req):
        if req.user.is_authenticated:
            post_array=PostSerializer(req.user.posts.all(),many=True)
            return Response(post_array.data)
        else:
            return Response({"Success":False, "Error": "No Authentication"})

class QueryFunctions:
    def is_near_location(content,val):
        arr=val.split(',')
        coord2=arr[0:2]
        coord1=[content["marker"]["lat"],content["marker"]["lng"]]
        dist=float(arr[2])
        xdist=float(coord1[0])-float(coord2[0])
        ydist=float(coord1[1])-float(coord2[1])
        return ((xdist*xdist+ydist*ydist)<(dist*dist))

    location_queries={
        "near": lambda content,val:QueryFunctions.is_near_location(content,val)
    }
    date_queries={}
    number_queries={
        "gt": lambda content,val:int(content["value"])>int(val),
        "eq": lambda content,val:int(content["value"])==int(val),
        "lt": lambda content,val:int(content["value"])<int(val)
        }
    queries={"location":location_queries,"date":date_queries,"number":number_queries}

class FilterPosts(GenericAPIView):
    serializer_class=PostSerializer
    queryset=Post.objects.all()
    @extend_schema(
        parameters=[OpenApiParameter(
            name='queries',
            type={'type': 'object'},
            location=OpenApiParameter.QUERY,
            required=False,
            default={"post_template_id":0,"<field_name>_<query_name>":"value"},
            style='form',
            explode=True,
        )],
        description=\
            "Endpoint for filtering post objects based on custom queries on their data fields.<br>\
            <ul>\
                <li>It takes GET parameters of form ```?<field_name>_<query_name>=<query_value>``` eg. ```?location_near=40,50,10 ```</li>\
                <li>It also needs parameter ```?post_template_id=<id>```</li>\
            </ul>\
            Current supported queries are:\
            <ul>\
                <li>Location\
                    <ul>\
                        <li>```<name>_near=<lat>,<lng>,<radius>``` → Returns true for fields that are at most ```<radius>``` far from ```<lat>,<lng>```.</li>\
                    </ul>\
                </li>\
                <li>Number\
                    <ul>\
                        <li>```<name>_gt=<int_value>``` → Returns true for fields greater than ```<int_value>```.</li>\
                        <li>```<name>_eq=<int_value>``` → Returns true for fields equal to ```<int_value>```.</li>\
                        <li>```<name>_lt=<int_value>``` → Returns true for fields less than ```<int_value>```.</li>\
                    <ul>\
                </li>\
            </ul>",
        tags=["Posts"]
    )
    def get(self,req,community_id):
        if req.user.is_authenticated:
            current_community=Community.objects.get(pk=community_id)
            relevant_posts = current_community.posts.filter(post_template=req.GET["post_template_id"])
            relevant_posts=PostSerializer(relevant_posts,many=True).data
            get_params=req.GET.keys()
            queries_requested={}
            for get_param in get_params:
                if get_param=="post_template_id":
                    continue
                obj=re.match(r'(.*)\_(.+)$',get_param,re.DOTALL)
                if obj:
                    field=obj.group(1)
                    query_type=obj.group(2)
                    query_value=req.GET[get_param]
                    queries_requested.setdefault(field,[]).append((query_type,query_value))
           #Field name -> Field+name 
            posts_to_return=[]
            for post in relevant_posts:
                try:
                    query_failed=False
                    for data_field in post["data_fields"]:
                        for query_type,query_value in queries_requested.get(data_field["name"],[]):
                            query_func= QueryFunctions.queries[data_field["type"]][query_type]
                            if not query_func(data_field["content"],query_value):
                                query_failed=True
                                break
                        if query_failed:
                            break
                    if query_failed:
                        continue
                except:
                    continue
                posts_to_return.append(post)
            
            return Response(posts_to_return)


class GetUserProfile(GenericAPIView):
	serializer_class=[UserSerializer,CommunitySerializer]
	@extend_schema(description= "Returns the user information with his/her joined communities and posts.",
	tags=["User"])
	def get(self,req,user_id):
		try:
			Requested_User = User.objects.get(pk = user_id)
		except:
			return Response({"Success":False, "Error": "No such a User"})

		user_seriliazed_data = UserSerializer(Requested_User).data
		del user_seriliazed_data["password"]

		communities=Requested_User.joined_communities.all()
		communities=CommunitySerializer(communities,many=True,context={"request":req})
		user_seriliazed_data["joined_communities"] = communities.data

		posts=PostSerializer(Requested_User.posts.all(),many=True)
		user_seriliazed_data["user_posts"] = posts.data

		return Response({"User": user_seriliazed_data})

		#return Response({"Success" : False, "Error": "No authentication  or query parameter not  correctly."})

class DeletePost(GenericAPIView):
	@extend_schema(
		parameters=[OpenApiParameter("post_id", OpenApiTypes.STR, OpenApiParameter.QUERY)],
		request=None, tags=["Posts"],
		description="If the user is the owner of the post or the moderator of the community, he/she deletes the post with the given post_id",
	)

	def post(self, req):
		if req.user.is_authenticated or "post_id" not in req.GET:
			post = Post.objects.get(pk=req.GET["post_id"])
			if req.user.id == post.poster_id or req.user.id == post.community.moderator_id:
				post.delete()	
				return Response({"Success" : True})
			return Response({"Success" : False, "Error": "No Authentication to delete this post"})

		return Response({"Success" : False, "Error" : "No Authentication or missing data"})

class UpdatePost(GenericAPIView):
    serializer_class=PostSerializer
    @extend_schema(
		parameters=[OpenApiParameter("post_id", OpenApiTypes.STR, OpenApiParameter.QUERY)],
		tags=["Posts"],
		description="If the user is the owner of the post or the moderator of the community, he/she edits the post with the given post_id",
	)
    def post(self,req):
        if req.user.is_authenticated and "post_id" in req.GET:
            try:
                post = Post.objects.get(pk=req.GET["post_id"])
            except:
                return Response({"Success" : False})
            if req.user.id == post.poster_id or req.user.id == post.community.moderator_id:
                post_serial=PostSerializer(post,data=req.data,context={"request":req},partial=True)
                if post_serial.is_valid():
                    post_serial.save()
                    return Response(post_serial.data)
                else:
                    return Response({"Success" : False,"Error":post_serial.errors})
        else:
            return Response({"Success" : False,"Error":"No authentication or authorization."})
