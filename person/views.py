from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
from .models import Person
import requests
import json

numberPerson = 10
PERSON_API = 'https://randomuser.me/api/?results='+str(numberPerson)


def person(response,id):
    person = Person()
    person.name = "bilal"
    person.age = 12
    person.content = "Icerik"
    person.isStudent = True
    person.save()
    return HttpResponse("<h1>person:</h1>")

def createPerson(req):
    print(req.GET["title"])
    person = Person()
    person.title = req.GET["title"]
    person.firstname = req.GET["firstname"] 
    person.lastname = req.GET["lastname"]
    person.location = req.GET["location"]
    person.email = req.GET["email"]
    person.age = req.GET["age"]
    person.phone = req.GET["phone"]
    person.imageUrl = req.GET["imageUrl"]
    person.save()
    return HttpResponse(person) 

def getFirst(req):
    person = Person.objects.first()
    return HttpResponse(person)
    
def getLast(req):
    person = Person.objects.last()
    return HttpResponse(person)


def savePeople(req):
    res = requests.get(PERSON_API)
    myJson = res.content.decode('utf8').replace("'", '"')
    data = json.loads(myJson)
    dataPretty = json.dumps(data, indent=2)
    print(dataPretty)
    # print(data["results"][0]["gender"])
    data = data["results"]
    for value in data:
        person = Person()
        person.title = value["name"]["title"]
        person.firstname = value["name"]["first"]
        person.lastname = value["name"]["last"]
        person.location = value["location"]["street"]["name"]
        person.email = value["email"]
        person.age = value["dob"]["age"]
        person.phone = value["phone"]
        person.imageUrl = value["picture"]["medium"]
        person.save()
        print(person)
        # person.email = value.
        
        # print(key)

    return HttpResponse(res.content)