from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import UserData


class RegisterUserAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

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

        if not (data.keys() >= required_keys):
            resp = {
                'message': 'Error: request body does not have all required keys'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        # TODO Should check postal code and such fit length restrictions
        # TODO Should check if username is in use

        new_user = User.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password'],
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
            postal_code=data['postalCode']
        )
        user_data.save()

        resp = {
            'message': 'Registered new user'
        }
        return Response(resp)
