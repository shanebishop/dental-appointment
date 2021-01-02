from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response

import logging
import random
import string

# For sending emails
import smtplib
import ssl
from email.mime.text import MIMEText

from .models import UserData, PartiallyRegisteredUser
from .serializers import UserSerializer

logger = logging.getLogger(__name__)

DEFAULT_PASSWORD = 'PBEWjwj83b4HsM3GCxD7dXak9huLbq6H'


class RegisterUserAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    # TODO Consider validating postal code further to follow A1A 1A1 format
    # TODO Consider validating email as well
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
            password=DEFAULT_PASSWORD,
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

        registration_token = ''.join(
            random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(32))

        partially_registered_entry = PartiallyRegisteredUser.objects.create(
            user=new_user,
            registration_token=registration_token
        )
        partially_registered_entry.save()

        # A better solution might be to queue sending registration emails separately,
        # so a response can be returned more quickly.
        # For now at least, we will simply not send an email if that is we are told
        # not to.
        if not ('skip_email' in data and data['skip_email']):
            RegisterUserAPI.send_registration_email(new_user, registration_token)

        resp = {
            'message': 'Registered new user'
        }
        return Response(resp)

    @staticmethod
    def send_registration_email(new_user, registration_token):
        port = 465  # For SSL

        # Create a secure SSL context
        context = ssl.create_default_context()

        sender = 'honours.proj.dental@gmail.com'
        recipient = new_user.email

        gmail_password = 'HonoursProject'

        succeeded = True

        with smtplib.SMTP_SSL('smtp.gmail.com', port, context=context) as server:
            server.login(sender, gmail_password)

            msg = MIMEText(f'''Hello {new_user.first_name} {new_user.last_name},

You recently began your registration with the Dr. Phil Ing Dental Clinic. You registered with the username
{new_user.username}.

Please visit http://localhost/auth/complete-registration to complete registration.

Use {registration_token} as your registration token and {new_user.username} as your username.

Thank you,
Dr. Phil Ing Dental Clinic Staff''')

            msg['Subject'] = 'Please complete your registration'
            msg['From'] = sender
            msg['To'] = recipient

            try:
                ret = server.sendmail(sender, [recipient], msg.as_string())
            except smtplib.SMTPRecipientsRefused:
                succeeded = False
                logger.error(f'Failed to send email to {new_user.username} using email address {new_user.email}.')

            if succeeded and not (isinstance(ret, dict) and (not ret)):
                # if ret is not an empty dictionary, then the email was not sent successfully
                succeeded = False
                logger.error(f'Failed to send email to {new_user.username} using email address {new_user.email}.')
                logger.error('Result of server.sendmail():')
                logger.error(ret)

            server.quit()

        return succeeded


class CompleteClientRegistrationAPI(generics.GenericAPIView):
    def post(self, request):
        data = request.data

        # Since we are using basic auth, we know what user is requesting this
        user = self.request.user

        if not isinstance(data, dict):
            resp = {
                'message': 'Error: request body is not a valid JSON object'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        required_keys = {'username', 'register_token', 'password'}
        missing_keys = required_keys - data.keys()

        if missing_keys:
            resp = {
                'message': f'Error: request body is missing the following required keys: {missing_keys}'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        try:
            partial_registered_entry = PartiallyRegisteredUser.objects.get(user=user)
        except PartiallyRegisteredUser.DoesNotExist:
            # In this case, the user is fully registered. However, we don't want to give
            # a message saying the user is fully registered, as this would let an attacker
            # now the username and password they entered were valid. So instead, we
            # simply emulate the username or password being incorrect.
            resp = {
                'detail': 'Invalid username/password.'
            }
            return Response(resp, status=status.HTTP_403_FORBIDDEN)

        # Check received registration token matches the registration token in the database
        if data['register_token'] != partial_registered_entry.registration_token:
            resp = {
                'message': 'Error: provided registration token is invalid'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(data['password'])
        user.save()

        # The user is no fully registered, so the partial registration entry is deleted
        partial_registered_entry.delete()

        serializer = UserSerializer(user)

        resp = {
            'message': f'{user.username} is now fully registered',
            'user': serializer.data,
        }
        return Response(resp)


class DeregisterUserAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        requesting_user = self.request.user

        if not requesting_user.is_superuser:
            resp = {
                'message': 'Only administrators can deregister users'
            }
            return Response(resp, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data

        if not isinstance(data, dict):
            resp = {
                'message': 'Error: request body is not a valid JSON object'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        if 'id' not in data:
            resp = {
                'message': 'Error: request body does not have an "id" key'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_id = int(data['id'])
        except ValueError:
            resp = {
                'message': 'Error: "id" is not and cannot be converted to an integer'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        try:
            to_delete = User.objects.get(id=user_id)
        except User.DoesNotExist:
            resp = {
                'message': f'No user found with {user_id} as ID'
            }
            return Response(resp, status=status.HTTP_404_NOT_FOUND)

        username = to_delete.username

        if username == 'admin':
            resp = {
                'message': 'Error: cannot deregister admin user'
            }
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

        to_delete.delete()

        resp = {
            'message': f'Deleted user with username {username}'
        }
        return Response(resp)


class GetAllUsersAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        requesting_user = self.request.user

        if not requesting_user.is_staff:
            resp = {
                'message': 'Only staff members can retrieve all users'
            }
            return Response(resp, status=status.HTTP_401_UNAUTHORIZED)

        users = User.objects.all()
        serializer = UserSerializer(users, many=True)

        resp = {
            'users': serializer.data
        }
        return Response(resp)
