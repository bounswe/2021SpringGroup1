from django.shortcuts import render
from django.http import HttpResponse
from .models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

@csrf_exempt
def try_login(req):
	if req.method == 'POST':
		if "username_input" in req.POST and "password_input" in req.POST:
			username_input=req.POST["username_input"]
			password_input=req.POST["password_input"]
		else:
			return JsonResponse({"Success":False,"Message":"Wrong request format."})
		
		user = authenticate(username=username_input, password=password_input)
		if user:
			login(req,user)
			return JsonResponse({"Success":True,"Message":"Successfully logged in."})
		else:
			return JsonResponse({"Success":False,"Message":"Authentication failed."})

@csrf_exempt
def try_register(req):
	if req.method == 'POST':
		if not "username" in req.POST or not "password" in req.POST or not "email" in req.POST:
			return JsonResponse({"Success":False,"Message":"Wrong request format."})
		else:
			username=req.POST["username"]
			email=req.POST["email"]
			password=req.POST["password"]
		user=User.objects.create_user(username, email, password)
		if user:
			return JsonResponse({"Success":True,"Message":"Successfully logged in."})
		else:
			return JsonResponse({"Success":False,"Message":"Username and/or email not avaible."})




