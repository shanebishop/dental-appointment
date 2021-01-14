from django.contrib.auth.models import User
from rest_framework import generics, permissions, status, mixins
from rest_framework.response import Response

from datetime import datetime

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

        data = request.data

        if not isinstance(data, dict):
            resp = {
                'message': 'Error: request body is not a valid JSON object'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        required_keys = {'client', 'date', 'extra_notes', 'hygienist', 'operation', 'extra_notes'}
        missing_keys = required_keys - data.keys()
        if missing_keys:
            resp = {
                'message': f'Error: request body is missing the following required keys: {missing_keys}'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        # Check the username has a user entry in the database
        client_username = data['client']
        try:
            client = User.objects.get(username=client_username)
        except User.DoesNotExist:
            resp = {
                'message': f'Error: No user found with username "{client_username}"'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        try:
            appointment_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
            appointment_time = datetime.strptime(data['time'], '%H:%M:%S').time()
        except ValueError as e:
            resp = {
                'message': f'Error: {str(e)}'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        appointment_has_conflict = False

        # Prevent creating an appointment that conflicts with an existing appointment for this client
        try:
            appointments = Appointment.objects.filter(client=client)
            for appointment in appointments:
                if conflict(appointment, appointment_date, appointment_time):
                    appointment_has_conflict = True
                    break
        except Appointment.DoesNotExist:
            # Client has no appointments, so there is no conflict
            appointment_has_conflict = False

        if appointment_has_conflict:
            resp = {
                'message': 'Error: Time and date conflict with an existing appointment for this client'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        appointment = Appointment.objects.create(
            date=data['date'],
            time=data['time'],
            client=client,
            hygienist=data['hygienist'],
            operation=data['operation'],
            extra_notes=data['extra_notes'],
        )
        appointment.save()

        resp = {
            'message': 'Appointment created'
        }
        return Response(resp, status=status.HTTP_201_CREATED)


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
        # TODO There is a problem here - since an appointment is being edited, its time may "conflict" with itself

        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """Cancel an appointment"""
        if not self.request.user.is_staff:
            resp = {
                'message': 'Appointments cannot be cancelled by non-staff'
            }
            return Response(resp, status=status.HTTP_401_UNAUTHORIZED)

        return self.destroy(request, *args, **kwargs)


def conflict(appointment_a, appointment_b_date, appointment_b_time):
    """Check if an appointment in the database (appointment_a) conflicts with
    a time and date for a new appointment"""
    return appointment_a.date == appointment_b_date and appointment_a.time == appointment_b_time
