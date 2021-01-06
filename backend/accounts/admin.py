from django.contrib import admin
from .models import UserData, PartiallyRegisteredUser

admin.site.register(UserData)
admin.site.register(PartiallyRegisteredUser)
