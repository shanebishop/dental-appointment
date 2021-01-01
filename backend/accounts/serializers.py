from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'first_name', 'last_name', 'email', 'id', 'username',
            'is_staff', 'is_superuser', 'is_active', 'date_joined',
        )
        read_only_fields = ('is_staff', 'is_superuser', 'is_active', 'date_joined',)
