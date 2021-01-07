from django.urls import path

from .api import AppointmentsList, AppointmentsDetail


urlpatterns = [
    path('api/appointments/list/', AppointmentsList.as_view()),
    path('api/appointments/detail/<int:pk>/', AppointmentsDetail.as_view()),
]
