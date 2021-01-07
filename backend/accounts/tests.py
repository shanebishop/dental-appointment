from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.test import APITestCase

from .models import UserData, PartiallyRegisteredUser
from .api import DEFAULT_PASSWORD
from utils import Utils


class RegisterUserAPITests(APITestCase):
    URL = '/api/user/register/'

    def setUp(self):
        token = Utils.create_admin_user()

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

    def test_create_user(self):
        username = 'user1'
        data = generate_valid_user_data(username)

        response = self.client.post(RegisterUserAPITests.URL, data)
        self.assertIs(response.status_code, status.HTTP_200_OK)

        user = User.objects.get(username=username)
        user_data = UserData.objects.get(user=user)

        self.assertEqual(user.first_name, data['firstName'])
        self.assertEqual(user.last_name, data['surname'])
        self.assertEqual(user.email, data['email'])
        self.assertEqual(user_data.address1, data['address1'])
        self.assertEqual(user_data.address2, data['address2'])
        self.assertEqual(user_data.city, data['city'])
        self.assertEqual(user_data.province, data['province'])
        self.assertEqual(user_data.postalCode, data['postalCode'])

    def test_empty_request_body(self):
        response = self.client.post(RegisterUserAPITests.URL, dict())
        self.assertContains(
            response, 'missing the following required keys',
            status_code=status.HTTP_400_BAD_REQUEST
        )

    def test_missing_data_value(self):
        data = generate_valid_user_data('user2')
        del data['surname']

        response = self.client.post(RegisterUserAPITests.URL, data)
        self.assertContains(
            response, 'missing the following required keys',
            status_code=status.HTTP_400_BAD_REQUEST
        )

    def test_reusing_username(self):
        username = 'user1'
        data = generate_valid_user_data(username)

        # Register username once
        response = self.client.post(RegisterUserAPITests.URL, data)
        self.assertIs(response.status_code, status.HTTP_200_OK)

        # Attempt to register username again
        response = self.client.post(RegisterUserAPITests.URL, data)
        self.assertContains(
            response, f'username {username} taken',
            status_code=status.HTTP_400_BAD_REQUEST
        )

    def test_postal_code_too_long(self):
        data = generate_valid_user_data('user3')
        data['postalCode'] = 'A1A 1B13'

        response = self.client.post(RegisterUserAPITests.URL, data)
        self.assertContains(
            response, 'postalCode exceeds max length',
            status_code=status.HTTP_400_BAD_REQUEST
        )


class CompleteClientRegistrationAPITests(APITestCase):
    URL = '/api/user/complete-registration/'

    def setUp(self):
        self.admin_auth_token = Utils.create_admin_user()

    def use_admin_creds(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.admin_auth_token)

    def use_client_creds(self, username, password):
        self.client.credentials(HTTP_AUTHORIZATION=Utils.generate_basic_auth(username, password))

    def create_regular_user(self, username):
        """Creates a regular user, leaving registration partially complete"""
        data = generate_valid_user_data(username)
        self.use_admin_creds()

        response = self.client.post(RegisterUserAPITests.URL, data)
        self.assertIs(response.status_code, status.HTTP_200_OK)

    def start_registration(self, username):
        """Starts user registration, without completing it. Returns the valid
        registration token for the user."""
        data = generate_valid_user_data(username)

        self.use_admin_creds()
        response = self.client.post(RegisterUserAPITests.URL, data)
        self.assertIs(response.status_code, status.HTTP_200_OK)

        user = User.objects.get(username=username)
        partial_registered_entry = PartiallyRegisteredUser.objects.get(user=user)
        return partial_registered_entry.registration_token

    def attempt_complete_registration(self, username, complete_registration_data):
        """Attempts to complete registration with provided
        data. Returns response received from complete registration attempt."""
        self.use_client_creds(username, DEFAULT_PASSWORD)
        return self.client.post(CompleteClientRegistrationAPITests.URL, complete_registration_data)

    def test_complete_registration(self):
        username = 'user1'
        register_token = self.start_registration(username)

        data = {
            'username': username,
            'register_token': register_token,
            'password': 'new_password',
        }

        response = self.attempt_complete_registration(username, data)
        self.assertIs(response.status_code, status.HTTP_200_OK)

    def test_empty_json_request_body(self):
        username = 'user2'
        self.start_registration(username)
        response = self.attempt_complete_registration(username, dict())

        self.assertIs(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue('request body is missing the following required keys' in response.json()['message'])

    def test_json_request_missing_key(self):
        username = 'user3'
        self.start_registration(username)

        # This data is missing the register_token key
        data = {
            'username': username,
            'password': 'new_password',
        }

        response = self.attempt_complete_registration(username, data)

        self.assertIs(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue('request body is missing the following required keys' in response.json()['message'])

    def test_user_is_not_partially_registered(self):
        username = 'user4'

        # Note that we do not start registration for the user, and that we proceed
        # directly to attempting to complete the registration that was not begin

        data = {
            'username': username,
            'password': 'new_password',
            'register_token': 'we-do-not-know-the-token',
        }

        response = self.attempt_complete_registration(username, data)

        self.assertIs(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue('Invalid username/password' in response.json()['detail'])

    def test_incorrect_register_token(self):
        username = 'user5'
        self.start_registration(username)

        data = {
            'username': username,
            'password': 'new_password',
            'register_token': 'an-invalid-token',
        }

        response = self.attempt_complete_registration(username, data)

        self.assertIs(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue('registration token is invalid' in response.json()['message'])


class DeregisterUserAPI(APITestCase):
    URL = '/api/user/deregister/'

    def setUp(self):
        token = Utils.create_admin_user()

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        self.create_regular_user('user1')

    def create_regular_user(self, username):
        data = generate_valid_user_data(username)

        response = self.client.post(RegisterUserAPITests.URL, data)
        self.assertIs(response.status_code, status.HTTP_200_OK)

    def test_deregister_user(self):
        user_id = Utils.get_user_id_by_username('user1')

        response = self.client.delete(DeregisterUserAPI.URL, {'id': user_id})
        self.assertIs(response.status_code, status.HTTP_200_OK)

    def test_deregister_without_id_key(self):
        response = self.client.delete(DeregisterUserAPI.URL, dict())

        self.assertIs(response.status_code, status.HTTP_400_BAD_REQUEST)

        message = response.json()['message']
        self.assertTrue('does not have an "id" key' in message)

    def test_deregister_with_invalid_id(self):
        response = self.client.delete(DeregisterUserAPI.URL, {'id': 'foo'})

        self.assertIs(response.status_code, status.HTTP_400_BAD_REQUEST)

        message = response.json()['message']
        self.assertTrue('"id" is not and cannot be converted to an integer' in message)

    def test_deregister_with_id_not_in_database(self):
        user_id = 100

        response = self.client.delete(DeregisterUserAPI.URL, {'id': user_id})

        self.assertIs(response.status_code, status.HTTP_404_NOT_FOUND)

        message = response.json()['message']
        self.assertTrue(f'No user found with {user_id} as ID' in message)

    def test_deregister_admin_user(self):
        user_id = Utils.get_user_id_by_username('admin')
        response = self.client.delete(DeregisterUserAPI.URL, {'id': user_id})

        self.assertIs(response.status_code, status.HTTP_400_BAD_REQUEST)

        message = response.json()['message']
        self.assertTrue('cannot deregister admin user' in message)


class GetAllUsersAPITests(APITestCase):
    URL = '/api/user/all/'

    def setUp(self):
        token = Utils.create_admin_user()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

    def test_get_all_users(self):
        response = self.client.get(GetAllUsersAPITests.URL)
        self.assertIs(response.status_code, status.HTTP_200_OK)

        users = response.json()['users']

        admin_user = [u for u in users if u['username'] == 'admin'][0]

        self.assertIs(admin_user['is_staff'], True)
        self.assertIs(admin_user['is_superuser'], True)


# Helper functions

def generate_valid_user_data(username, skip_email=True):
    data = {
        'username': username,
        'firstName': 'John',
        'surname': 'Doe',
        'email': 'user1@company.com',
        'address1': '1234 Private Drive',
        'address2': '',
        'city': 'Toronto',
        'province': 'Ontario',
        'postalCode': 'A1A 1B1',
    }
    if skip_email:
        data['skip_email'] = skip_email
    return data
