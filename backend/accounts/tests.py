from django.contrib.auth.models import User
from knox.models import AuthToken

from rest_framework import status
from rest_framework.test import APITestCase

from .models import UserData


class RegisterUserAPITests(APITestCase):
    URL = '/api/user/register/'

    def setUp(self):
        token = create_admin_user()

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


class DeregisterUserAPI(APITestCase):
    URL = '/api/user/deregister/'

    def setUp(self):
        token = create_admin_user()

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        self.create_regular_user('user1')

    def create_regular_user(self, username):
        data = generate_valid_user_data(username)

        response = self.client.post(RegisterUserAPITests.URL, data)
        self.assertIs(response.status_code, status.HTTP_200_OK)

    def test_deregister_user(self):
        user_id = get_user_id_by_username('user1')

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
        user_id = get_user_id_by_username('admin')
        response = self.client.delete(DeregisterUserAPI.URL, {'id': user_id})

        self.assertIs(response.status_code, status.HTTP_400_BAD_REQUEST)

        message = response.json()['message']
        self.assertTrue('cannot deregister admin user' in message)


class GetAllUsersAPITests(APITestCase):
    URL = '/api/user/all/'

    def setUp(self):
        token = create_admin_user()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

    def test_get_all_users(self):
        response = self.client.get(GetAllUsersAPITests.URL)
        self.assertIs(response.status_code, status.HTTP_200_OK)

        users = response.json()['users']

        admin_user = [u for u in users if u['username'] == 'admin'][0]

        self.assertIs(admin_user['is_staff'], True)
        self.assertIs(admin_user['is_superuser'], True)


# Helper functions

def generate_valid_user_data(username):
    return {
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


def create_admin_user():
    admin_user = User.objects.create_user(
        username='admin', password='admin',
        is_staff=True, is_superuser=True
    )
    admin_user.save()

    _, token = AuthToken.objects.create(admin_user)

    return token


def get_user_id_by_username(username):
    user = User.objects.get(username=username)
    return user.id
