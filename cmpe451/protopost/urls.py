from django.urls import path
from django.urls.resolvers import URLPattern
from . import views
from . import register

urlpatterns = [
	path("", views.home, name="home_pages"),
	path("register", register.try_register, name= "register_func" )
]