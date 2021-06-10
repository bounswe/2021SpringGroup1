from django import forms

class CreateNews(forms.Form):
    author = forms.CharField(max_length = 50,label = "Author") 
    title = forms.CharField(max_length = 100,label = "Title")
    descr = forms.CharField(max_length = 300,label = "Descr")
    url = forms.CharField(max_length =  300 ,label = "Link")
    url_to_img = forms.CharField(max_length=300,label = "Img_link")
