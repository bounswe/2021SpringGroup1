from django.db.models.fields import NullBooleanField
from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.http import HttpResponse
from person.models import Person


def loginpage(request):

    if request.method == "POST":
        first = request.POST["firstname"]
        last = request.POST["lastname"]
        person = Person.objects.filter(firstname=first, lastname=last)
        if person[0].id == None:
            request.session["errormsg"] = "there is no person with the firstname of %s and the lastname of %s!" % (
                request.POST["firstname"], request.POST["lastname"])
            return errorpage(request)

        request.session["firstname"] = request.POST["firstname"]
        request.session["lastname"] = request.POST["lastname"]
        request.session["id"] = person[0].id

        return HttpResponseRedirect("/post2")

    if request.method == "GET":
        return render(request, "login/login.html")

    request.session["errormsg"] = "unknown request type!"
    return errorpage(request)


def errorpage(request):
    if "errormsg" in request.session:
        return render(request, "login/error.html", {"errormsg": request.session["errormsg"]})
    else:
        return render(request, "login/error.html", {"errormsg": "there was no error message"})
