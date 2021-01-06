from django.db import models
from django.conf import settings


# See https://docs.djangoproject.com/en/3.1/topics/serialization/#natural-keys
class AppointmentManager(models.Manager):
    def get_by_natural_key(self, date, time, client):
        return self.get(date=date, time=time, client=client)


class Appointment(models.Model):
    date = models.DateField()
    time = models.TimeField()
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    hygienist = models.CharField(max_length=200)
    operation = models.CharField(max_length=100)
    extra_notes = models.CharField(max_length=1000, blank=True)

    objects = AppointmentManager

    class Meta:
        unique_together = [['date', 'time', 'client']]
