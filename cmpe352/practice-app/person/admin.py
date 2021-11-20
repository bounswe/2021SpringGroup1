from django.contrib import admin

# Register your models here.
from .models import Person
# Register your models here.

# admin.site.register(Article)
@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ["id","firstname","lastname","email","phone","age","createdDate","imageUrl","createdDate"]
    list_display_links = ["firstname","createdDate"]
    search_fields = ["id","firstname","lastname","email"]
    list_filter = ["id","createdDate"]
    
    class Meta:
        model = Person