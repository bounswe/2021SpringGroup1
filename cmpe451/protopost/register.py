from django.shortcuts import render
from django.http import HttpResponse
from .models import User
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def try_register(req):
	if req.method == 'POST':
		user=User()
		if not "user_name" in req.POST:
			return HttpResponse("Fail, no username.")
		else:
			user.user_name=req.POST["user_name"]
		if not "password" in req.POST:
			return HttpResponse("Fail, no password.")
		else:
			user.password=req.POST["password"]
			user.save()
		return HttpResponse("Success")



