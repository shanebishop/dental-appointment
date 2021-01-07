import base64
from django.contrib.auth.models import User
from knox.models import AuthToken


class Utils:
    @staticmethod
    def create_admin_user():
        admin_user = User.objects.create_user(
            username='admin', password='admin',
            is_staff=True, is_superuser=True
        )
        admin_user.save()

        _, token = AuthToken.objects.create(admin_user)

        return token

    @staticmethod
    def get_user_id_by_username(username):
        user = User.objects.get(username=username)
        return user.id

    @staticmethod
    def get_user_auth_token(username):
        user = User.objects.get(username=username)
        _, token = AuthToken.objects.create(user)
        return token

    @staticmethod
    def generate_basic_auth(username, password):
        message_bytes = (username + ':' + password).encode('ascii')
        base64_bytes = base64.b64encode(message_bytes)
        return 'Basic ' + base64_bytes.decode('ascii')
