from django.contrib.auth.models import User
from knox.models import AuthToken

from rest_framework import status
from rest_framework.test import APITestCase

# from .models import UserData


class RegisterUserAPITests(APITestCase):
    def test_register_user__empty_request_body(self):
        admin_user = User.objects.create_user(
            username='admin', password='admin',
            is_staff=True, is_superuser=True
        )
        admin_user.save()

        _, token = AuthToken.objects.create(admin_user)

        # token = get_knox_auth_token('admin')
        print(token)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        response = self.client.post('/api/user/register/', dict())
        print(response)
        self.assertIs(response.status_code, status.HTTP_400_BAD_REQUEST)
