from django.urls import path

from .api import RegisterUserAPI, DeregisterUserAPI, GetAllUsersAPI, CompleteClientRegistrationAPI, UserProfileAPI


urlpatterns = [
    path('api/user/register/', RegisterUserAPI.as_view()),
    path('api/user/complete-registration/', CompleteClientRegistrationAPI.as_view()),
    path('api/user/deregister/', DeregisterUserAPI.as_view()),
    path('api/user/all/', GetAllUsersAPI.as_view()),
    path('api/user/profile/', UserProfileAPI.as_view()),
]
