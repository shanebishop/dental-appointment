from rest_framework import serializers

from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    client = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = '__all__'

    def get_client(self, obj):
        client = obj.client
        return {
            'id': client.id,
            'username': client.username,
            'display_name': f'{client.first_name} {client.last_name}',
        }
