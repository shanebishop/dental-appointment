from django.contrib.auth.models import User
from knox.models import AuthToken

from rest_framework import status
from rest_framework.test import APITestCase


class RegisterUserAPITests(APITestCase):
    URL = '/api/user/register/'

    def setUp(self):
        admin_user = User.objects.create_user(
            username='admin', password='admin',
            is_staff=True, is_superuser=True
        )
        admin_user.save()

        _, token = AuthToken.objects.create(admin_user)

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

    @staticmethod
    def generate_valid_data(username):
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

    def test_create_user(self):
        data = self.generate_valid_data('user1')

        response = self.client.post(RegisterUserAPITests.URL, data)
        self.assertIs(response.status_code, status.HTTP_200_OK)

    def test_empty_request_body(self):
        response = self.client.post(RegisterUserAPITests.URL, dict())
        self.assertContains(
            response, 'does not have all required keys',
            status_code=status.HTTP_400_BAD_REQUEST
        )

    def test_missing_data_value(self):
        data = self.generate_valid_data('user2')
        del data['surname']

        response = self.client.post(RegisterUserAPITests.URL, data)
        self.assertContains(
            response, 'does not have all required keys',
            status_code=status.HTTP_400_BAD_REQUEST
        )

    def test_reusing_username(self):
        username = 'user1'
        data = self.generate_valid_data(username)

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
        data = self.generate_valid_data('user3')
        data['postalCode'] = 'A1A 1B13'

        response = self.client.post(RegisterUserAPITests.URL, data)
        self.assertContains(
            response, 'postalCode exceeds max length',
            status_code=status.HTTP_400_BAD_REQUEST
        )
