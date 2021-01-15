from django.contrib.auth.models import User
from rest_framework import generics, permissions, status, mixins
from rest_framework.response import Response

from datetime import datetime

from .models import Appointment
from .serializers import AppointmentSerializer


def preprocess_appointment_req(request, required_keys):
    data = request.data
    client = None
    appointment_date = None
    appointment_time = None

    if not isinstance(data, dict):
        resp = {
            'message': 'Error: request body is not a valid JSON object'
        }
        return Response(resp, status=status.HTTP_400_BAD_REQUEST), client, appointment_date, appointment_time

    missing_keys = required_keys - data.keys()
    if missing_keys:
        resp = {
            'message': f'Error: request body is missing the following required keys: {missing_keys}'
        }
        return Response(resp, status=status.HTTP_400_BAD_REQUEST), client, appointment_date, appointment_time

    # Check the username has a user entry in the database
    client_username = data['client']
    try:
        client = User.objects.get(username=client_username)
    except User.DoesNotExist:
        resp = {
            'message': f'Error: No user found with username "{client_username}"'
        }
        return Response(resp, status=status.HTTP_400_BAD_REQUEST), client, appointment_date, appointment_time

    try:
        appointment_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        appointment_time = datetime.strptime(data['time'], '%H:%M:%S').time()
    except ValueError as e:
        resp = {
            'message': f'Error: {str(e)}'
        }
        return Response(resp, status=status.HTTP_400_BAD_REQUEST), client, appointment_date, appointment_time

    return None, client, appointment_date, appointment_time


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

        required_keys = {'client', 'date', 'extra_notes', 'hygienist', 'operation', 'extra_notes'}
        resp, client, appointment_date, appointment_time = preprocess_appointment_req(request, required_keys)

        if resp:
            return resp

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

        data = request.data
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

        required_keys = {'id', 'client', 'date', 'extra_notes', 'hygienist', 'operation', 'extra_notes'}
        resp, client, appointment_date, appointment_time = preprocess_appointment_req(request, required_keys)

        if resp:
            return resp

        data = request.data
        data_id = int(data['id'])

        to_update = Appointment.objects.get(id=data_id)
        if to_update.client.username != data['client']:
            resp = {
                'message': 'Error: Cannot change client for an appointment'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        appointment_has_conflict = False

        # Prevent updating the appointment in such a way that the new date and time conflicts with
        # another appointment for the client
        try:
            appointments = Appointment.objects.filter(client=client)
            for appointment in appointments:
                if appointment.id == data_id:
                    continue  # Skip the appointment that is being edited
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
