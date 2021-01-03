from django.contrib.auth.models import User
from accounts.models import PartiallyRegisteredUser
import os

username = os.getenv("USERNAME")

user = User.objects.get(username=username)
record = PartiallyRegisteredUser.objects.get(user=user)
print(record.registration_token)

exit(0)
