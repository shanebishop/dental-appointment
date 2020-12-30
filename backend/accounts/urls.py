from django.urls import path

from .api import RegisterUserAPI


urlpatterns = [
    path('api/user/register/', RegisterUserAPI.as_view()),
]
