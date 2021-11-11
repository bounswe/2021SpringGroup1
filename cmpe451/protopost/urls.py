from django.urls import path
from django.urls.resolvers import URLPattern
from . import views,home,register


urlpatterns = [
	path("", views.home, name="home_pages"),
	path("try_register", register.try_register, name= "try_register" ),
	path("try_login", register.try_login, name= "try_login" ),
	path("test_auth",register.test_auth, name="test_auth"),
	path("try_logout",register.try_logout, name="try_logout"),
	path("communities/<int:community_id>/try_create_post",home.try_create_post,name="try_create_post"),
	path("communities/<int:community_id>/try_create_post_template",home.try_create_post_template,name="try_create_post_template"),
	path("create_community", home.try_create_community, name="try_create_community"),
	path("search_communities", home.search_communities, name="search_communities"),
	path("communities/get_community_data",home.get_community_data,name="get_community_data"),
]
