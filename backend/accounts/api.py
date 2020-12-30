from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import UserData


class RegisterUserAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    DEFAULT_PASSWORD = 'PBEWjwj83b4HsM3GCxD7dXak9huLbq6H'

    # TODO Consider validating postal code further to follow A1A 1A1 format
    def post(self, request):
        requesting_user = self.request.user

        if not requesting_user.is_staff:
            resp = {
                'message': 'Only staff can register users'
            }
            return Response(resp, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data

        if not isinstance(data, dict):
            resp = {
                'message': 'Error: request body is not a valid JSON object'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        required_keys = {
            'username', 'firstName', 'surname', 'email',
            'address1', 'address2', 'city', 'province', 'postalCode'
        }

        missing_keys = required_keys - data.keys()

        if missing_keys:
            resp = {
                'message': f'Error: request body is missing the following required keys: {missing_keys}'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        usernames = {u.username for u in User.objects.all()}

        if data['username'] in usernames:
            resp = {
                'message': 'Error: username ' + data['username'] + ' taken'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        for k in {'address1', 'address2', 'city', 'province', 'postalCode'}:
            if len(data[k]) > UserData._meta.get_field(k).max_length:
                resp = {
                    'message': f'Error: {k} exceeds max length'
                }
                return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        # The user is registered with the default password,
        # and then the user cannot log into the site until they have
        # completed their registration
        new_user = User.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=RegisterUserAPI.DEFAULT_PASSWORD,
            first_name=data['firstName'],
            last_name=data['surname']
        )
        new_user.save()

        user_data = UserData.objects.create(
            user=new_user,
            address1=data['address1'],
            address2=data['address2'],
            city=data['city'],
            province=data['province'],
            postalCode=data['postalCode']
        )
        user_data.save()

        resp = {
            'message': 'Registered new user'
        }
        return Response(resp)
