from django.urls import path

from .api import RegisterUserAPI, DeregisterUserAPI, GetAllUsersAPI


urlpatterns = [
    path('api/user/register/', RegisterUserAPI.as_view()),
    path('api/user/deregister/', DeregisterUserAPI.as_view()),
    path('api/user/all/', GetAllUsersAPI.as_view()),
]
