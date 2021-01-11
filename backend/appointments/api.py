from rest_framework import generics, permissions, status, mixins
from rest_framework.response import Response

from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentsList(mixins.ListModelMixin,
                       mixins.CreateModelMixin,
                       generics.GenericAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """Get appointments.

        If user is staff, returns all appointments.
        If user is not staff, returns only that user's appointments."""
        user = self.request.user

        if user.is_staff:
            appointments = Appointment.objects.all()
        else:
            appointments = Appointment.objects.filter(client=user)

        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """Create an appointment"""
        if not self.request.user.is_staff:
            resp = {
                'message': 'Appointments cannot be created by non-staff'
            }
            return Response(resp, status=status.HTTP_401_UNAUTHORIZED)

        # TODO Add tests for this
        # Check the client, if it is a number, is has an entry in the
        # TODO

        # TODO Need to prevent creating an appointment that conflicts with an existing appointment for this client
        # This would need API tests

        return self.create(request, *args, **kwargs)


class AppointmentsDetail(mixins.UpdateModelMixin,
                         mixins.DestroyModelMixin,
                         generics.GenericAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):
        """Update an appointment"""
        if not self.request.user.is_staff:
            resp = {
                'message': 'Appointments cannot be modified by non-staff'
            }
            return Response(resp, status=status.HTTP_401_UNAUTHORIZED)

        # TODO Need to prevent updating an appointment to conflict with the client's other appointment
        # This would need API tests

        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """Cancel an appointment"""
        if not self.request.user.is_staff:
            resp = {
                'message': 'Appointments cannot be cancelled by non-staff'
            }
            return Response(resp, status=status.HTTP_401_UNAUTHORIZED)

        return self.destroy(request, *args, **kwargs)
