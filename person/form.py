from django import forms
from .models import Person

class addPersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = ["title","firstname","lastname","location","email","age","phone","imageUrl"]