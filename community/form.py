from django import forms
from .models import Community

class addCommunityForm(forms.ModelForm):
    class Meta:
        model = Community
        fields = ["name","isPrivate"]