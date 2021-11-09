from django.urls import path
from django.urls.resolvers import URLPattern
from . import views
from . import register

urlpatterns = [
	path("", views.home, name="home_pages"),
	path("try_register", register.try_register, name= "try_register" ),
	path("try_login", register.try_login, name= "try_login" ),
	path("test_auth",register.test_auth, name="test_auth"),
	path("try_logout",register.try_logout, name="try_logout")
]