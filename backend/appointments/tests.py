import os
import json
import datetime
from pprint import pprint

from django.core.management import call_command
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from utils import Utils

from .models import Appointment


USER_DATA = {
    2: {'display_name': 'Bob Buchanan', 'id': 2, 'username': 'bobb'},
    3: {'display_name': 'Ruth Murray', 'id': 3, 'username': 'ruthm'},
    4: {'display_name': 'James Good', 'id': 4, 'username': 'jamesg'},
    5: {'display_name': 'Martin Meza', 'id': 5, 'username': 'martinm'},
    6: {'display_name': 'Rebecca Garcia', 'id': 6, 'username': 'rebeccag'},
    7: {'display_name': 'Frank Brandt', 'id': 7, 'username': 'frankb'},
}


# This serves as a superclass for the other APITestCase classes in this file.
# This superclass provides a common setUp() function and some common helper functions.
class AppointmentsTestCase(APITestCase):
    def setUp(self):
        # Create admin user, get admin user's token, and set client credentials
        self.admin_auth_token = Utils.create_admin_user()
        self.use_admin_creds()

        # Find fixtures path
        this_file_path = os.path.dirname(os.path.realpath(__file__))
        fixtures_path = os.path.realpath(os.path.join(this_file_path, '..', 'fixtures'))

        appointments_json_file = os.path.join(fixtures_path, 'appointments.json')

        # Load fixtures
        # verbosity=0 turns off "Installed x object(s) from y fixture(s)" messages
        call_command('loaddata', os.path.join(fixtures_path, 'users.json'), verbosity=0)
        call_command('loaddata', os.path.join(fixtures_path, 'userdata.json'), verbosity=0)
        call_command('loaddata', appointments_json_file, verbosity=0)

        # Get appointments JSON
        with open(appointments_json_file) as f:
            self.appointments_json = json.load(f)

    def use_admin_creds(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.admin_auth_token)

    def use_client_creds(self, username):
        token = Utils.get_user_auth_token(username)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)


class AppointmentsListTests(AppointmentsTestCase):
    URL = '/api/appointments/list/'

    def setUp(self):
        # Create admin user, get admin user's token, and set client credentials
        self.admin_auth_token = Utils.create_admin_user()
        self.use_admin_creds()

        # Find fixtures path
        this_file_path = os.path.dirname(os.path.realpath(__file__))
        fixtures_path = os.path.realpath(os.path.join(this_file_path, '..', 'fixtures'))

        appointments_json_file = os.path.join(fixtures_path, 'appointments.json')

        # Load fixtures
        # verbosity=0 turns off "Installed x object(s) from y fixture(s)" messages
        call_command('loaddata', os.path.join(fixtures_path, 'users.json'), verbosity=0)
        call_command('loaddata', os.path.join(fixtures_path, 'userdata.json'), verbosity=0)
        call_command('loaddata', appointments_json_file, verbosity=0)

        # Get appointments JSON
        with open(appointments_json_file) as f:
            self.appointments_json = json.load(f)

    def test_get_as_staff(self):
        # Use staff credentials
        self.use_admin_creds()

        response = self.client.get(AppointmentsListTests.URL)
        self.assertIs(response.status_code, status.HTTP_200_OK)

        # Since we are using a staff user, we expect to get back all appointments.
        # From the fixture data, we only want the field data.
        expected_appointments = [e['fields'] for e in self.appointments_json]

        for appointment in expected_appointments:
            appointment['client'] = USER_DATA[appointment['client']]

        # Remove all 'id' keys from the response JSON
        response_json = response.json()
        for a in response_json:
            del a['id']

        self.assertEqual(response_json, expected_appointments)

    def test_get_as_client(self):
        self.use_client_creds('bobb')

        response = self.client.get(AppointmentsListTests.URL)
        self.assertIs(response.status_code, status.HTTP_200_OK)

        bobb_client_json = USER_DATA[2]

        expected_response = [
            {
                'id': 1, 'date': '2021-05-23', 'time': '14:30:00',
                'hygienist': 'Cheryl Holder', 'operation': 'Checkup',
                'extra_notes': 'Yearly checkup', 'client': bobb_client_json
            },
            {
                'id': 2, 'date': '2021-06-03', 'time': '10:00:00',
                'hygienist': 'Tonya Combs', 'operation': 'Fillings',
                'extra_notes': '', 'client': bobb_client_json
            },
            {
                'id': 3, 'date': '2021-06-03', 'time': '11:15:00',
                'hygienist': 'Tonya Combs', 'operation': 'Fillings',
                'extra_notes': '', 'client': bobb_client_json
            }
        ]

        actual_response = response.json()

        self.assertEqual(len(actual_response), len(expected_response))
        self.assertEqual(actual_response, expected_response)

    def test_get_as_client_with_no_appointments(self):
        self.use_client_creds('frankb')

        response = self.client.get(AppointmentsListTests.URL)
        self.assertIs(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.json(), [])

    def test_create_appointment(self):
        self.use_admin_creds()

        data = {
            'date': '2021-09-02',
            'time': '12:15:00',
            'client': 'martinm',
            'hygienist': 'Sabrina Hess',
            'operation': 'Checkup',
            'extra_notes': ''
        }

        response = self.client.post(AppointmentsListTests.URL, data)
        self.assertIs(response.status_code, status.HTTP_201_CREATED)

        # Get appointments from database
        appointments = Appointment.objects.filter(client=5)
        self.assertIs(len(appointments), 1)

        appointment = appointments[0]

        # Check all of the values in the database match the request data
        self.assertEqual(appointment.client, User.objects.get(username='martinm'))
        self.assertEqual(appointment.operation, data['operation'])
        self.assertEqual(appointment.extra_notes, data['extra_notes'])
        self.assertEqual(appointment.date, datetime.datetime.strptime(data['date'], '%Y-%m-%d').date())
        self.assertEqual(appointment.time, datetime.datetime.strptime(data['time'], '%H:%M:%S').time())

    def test_create_appointment_fails_if_not_staff(self):
        self.use_client_creds('bobb')

        data = {
            'date': '2021-09-02',
            'time': '12:15:00',
            'client': 'martinm',
            'hygienist': 'Sabrina Hess',
            'operation': 'Checkup',
            'extra_notes': ''
        }

        response = self.client.post(AppointmentsListTests.URL, data)
        self.assertIs(response.status_code, status.HTTP_401_UNAUTHORIZED)

        message = response.json()['message']
        self.assertTrue('Appointments cannot be created by non-staff' in message)


class AppointmentDetailTests(AppointmentsTestCase):
    URL = '/api/appointments/detail/'

    def put(self, pk, data):
        return self.client.put(f'{AppointmentDetailTests.URL}{pk}/', data)

    def delete(self, pk):
        return self.client.delete(f'{AppointmentDetailTests.URL}{pk}/')

    def test_update_appointment(self):
        self.use_admin_creds()

        data = {
            'date': '2021-05-23',
            'time': '13:00:00',
            'client': 2,
            'hygienist': 'Sabrina Hess',
            'operation': 'Checkup',
            'extra_notes': 'Yearly checkup'
        }

        appointment_id = 1

        response = self.put(appointment_id, data)
        self.assertIs(response.status_code, status.HTTP_200_OK)

        appointment = Appointment.objects.get(pk=appointment_id)

        # Check all of the values in the database match the request data
        self.assertEqual(appointment.client, User.objects.get(username='bobb'))
        self.assertEqual(appointment.operation, data['operation'])
        self.assertEqual(appointment.extra_notes, data['extra_notes'])
        self.assertEqual(appointment.date, datetime.datetime.strptime(data['date'], '%Y-%m-%d').date())
        self.assertEqual(appointment.time, datetime.datetime.strptime(data['time'], '%H:%M:%S').time())

    def test_update_appointment_fails_if_not_staff(self):
        self.use_client_creds('bobb')

        data = {
            'date': '2021-05-23',
            'time': '13:00:00',
            'client': 2,
            'hygienist': 'Sabrina Hess',
            'operation': 'Checkup',
            'extra_notes': 'Yearly checkup'
        }

        appointment_id = 1
        appointment_before = Appointment.objects.get(pk=appointment_id)

        response = self.put(appointment_id, data)
        self.assertIs(response.status_code, status.HTTP_401_UNAUTHORIZED)

        message = response.json()['message']
        self.assertTrue('Appointments cannot be modified by non-staff' in message)

        # Check appointment was not modified
        appointment_after = Appointment.objects.get(pk=appointment_id)
        self.assertEqual(appointment_after, appointment_before)

    def test_delete_appointment(self):
        self.use_admin_creds()

        appointment_id = 1

        response = self.delete(appointment_id)
        self.assertIs(response.status_code, status.HTTP_204_NO_CONTENT)

        # Check appointment does not exist
        with self.assertRaises(Appointment.DoesNotExist):
            Appointment.objects.get(pk=appointment_id)

    def test_delete_appointment_fails_if_not_staff(self):
        self.use_client_creds('bobb')

        appointment_id = 2

        response = self.delete(appointment_id)
        self.assertIs(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Check appointment still exists
        try:
            Appointment.objects.get(pk=appointment_id)
        except Appointment.DoesNotExist:
            self.fail('Appointment was deleted')
