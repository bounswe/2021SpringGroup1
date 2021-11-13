from django.urls import path
from django.conf.urls import url
from django.urls.resolvers import URLPattern
from . import views,home,register




urlpatterns = [
	# path("try_register", register.try_register, name= "try_register" ),
	# path("try_login", register.try_login, name= "try_login" ),
	# path("test_auth",register.test_auth, name="test_auth"),
	# path("try_logout",register.try_logout, name="try_logout"),
	# path("communities/<int:community_id>/try_create_post",home.try_create_post,name="try_create_post"),
	# path("communities/<int:community_id>/try_create_post_template",home.try_create_post_template,name="try_create_post_template"),
	# path("try_create_community", home.try_create_community, name="try_create_community"),
	# path("search_communities", home.search_communities, name="search_communities"),
	# path("communities/<int:community_id>/get_community_data",home.get_community_data,name="get_community_data"),
	# path("communities/<int:community_id>/get_subscription_status",home.get_subscription_status,name="get_subscription_status"),
	# path("communities/<int:community_id>/set_subscription_status",home.set_subscription_status,name="set_subscription_status"),
	# path("get_user_posts",home.get_user_posts,name="get_user_posts"),
	# path("get_user_home_feed",home.get_user_home_feed,name="get_user_home_feed"),
	# path("get_post",home.get_post,name="get_post"),
	# path("get_user_communities",home.get_user_communities,name="get_user_communities"),
	# path("get_all_communities",home.get_all_communities,name="get_all_communities"),
	# path("",home.schema_view,name="schema_view")
	# path("try_register", views.try_register, name= "try_register" ),
	path("login", views.Login.as_view(), name= "login" ),
	path("register", views.Register.as_view(), name= "register"),
	path("communities/<int:community_id>/create_post",views.CreatePost.as_view(),name="create_post"),
	path("communities/<int:community_id>/create_post_template",views.CreatePostTemplate.as_view(),name="create_post_template"),
	path("create_community",views.CreateCommunity.as_view(),name="create_community"),
	path("list_communities",views.ListCommunities.as_view(),name="list_communities"),
	path("get_community_data",views.GetCommunityData.as_view(),name="get_community_data"),
	path("communities/<int:community_id>/list_post_templates",views.ListPostTemplates.as_view(),name="list_post_templates"),
	path("communities/<int:community_id>/list_community_posts",views.ListCommunityPosts.as_view(),name="list_community_post"),
]
