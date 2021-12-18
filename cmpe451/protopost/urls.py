from django.urls import path
from django.conf.urls import url
from django.urls.resolvers import URLPattern
from . import views




urlpatterns = [
	path("login", views.Login.as_view(), name= "login" ),
	path("register", views.Register.as_view(), name= "register"),
	path("logout", views.Logout.as_view(), name= "logout"),
	
	
	path("get_user_home_feed",views.GetUserHomeFeed.as_view(),name="get_user_home_feed"),
	path("get_user_created_posts",views.GetUserCreatedPosts.as_view(),name="get_user_created_posts"),
	
	path("create_community",views.CreateCommunity.as_view(),name="create_community"),
	path("list_communities",views.ListCommunities.as_view(),name="list_communities"),
	path("search_communities",views.SearchCommunities.as_view(),name="search_communities"),
	path("communities/<int:community_id>/search_posts_in_community",views.SearchPostsInCommunity.as_view(),name="search_posts_in_community"),
	path("communities/<int:community_id>/create_post",views.CreatePost.as_view(),name="create_post"),
	path("communities/<int:community_id>/create_post_template",views.CreatePostTemplate.as_view(),name="create_post_template"),
	path("communities/<int:community_id>/get_community_data",views.GetCommunityData.as_view(),name="get_community_data"),
	
	path("communities/<int:community_id>/list_post_templates",views.ListPostTemplates.as_view(),name="list_post_templates"),
	path("communities/<int:community_id>/list_community_posts",views.ListCommunityPosts.as_view(),name="list_community_post"),
	path("communities/<int:community_id>/user_subscription", views.UserSubscriptionStatus.as_view(), name= "user_subscription"),
]
