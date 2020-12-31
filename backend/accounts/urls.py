from django.urls import path

from .api import RegisterUserAPI, DeregisterUserAPI


urlpatterns = [
    path('api/user/register/', RegisterUserAPI.as_view()),
    path('api/user/deregister/', DeregisterUserAPI.as_view()),
]
