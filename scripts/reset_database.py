# Python script to reset database

from django.contrib.auth.models import User
from django.core.management import call_command

from accounts.models import UserData
from appointments.models import Appointment


# Drop all user data and appointments
Appointment.objects.all().delete()
UserData.objects.all().delete()

# Drop all users, except for admin user
for user in User.objects.all().iterator():
    if user.username != 'admin':
        user.delete()

# Load all fixtures
# verbosity=0 turns off "Installed x object(s) from y fixture(s)" messages
call_command('loaddata', '/code/backend/fixtures/users.json', verbosity=0)
call_command('loaddata', '/code/backend/fixtures/userdata.json', verbosity=0)
call_command('loaddata', '/code/backend/fixtures/appointments.json', verbosity=0)

print('Database reset successfully.')

exit(0)
