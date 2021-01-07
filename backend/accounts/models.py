from django.db import models
from django.conf import settings


class UserData(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    address1 = models.CharField(max_length=200)
    address2 = models.CharField(max_length=200)
    city = models.CharField(max_length=80)
    province = models.CharField(max_length=80)
    postalCode = models.CharField(max_length=7)

    def __str__(self):
        return f'user: {self.user}, address 1: {self.address1}, address 2: {self.address2}, city: {self.city}, ' \
               f'province: {self.province}, postal code: {self.postalCode}'


# TODO Bring these back once https://stackoverflow.com/q/65600035/8593689 has been answered
# class UserManager(models.Manager):
#     def get_by_natural_key(self, username):
#         return self.get(username=username)
#
#
# # A proxy model for the User model.
# # This proxy model exists so the custom UserManager manager (above)
# # can be used.
# # For info on proxy models, see:
# # https://docs.djangoproject.com/en/3.1/topics/db/models/#proxy-models
# # For info on extending the User model, see:
# # https://docs.djangoproject.com/en/3.1/topics/auth/customizing/#extending-the-existing-user-model
# class UserProxy(User):
#     objects = UserManager
#
#     class Meta:
#         proxy = True
#         unique_together = [['username']]


class PartiallyRegisteredUser(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    registration_token = models.CharField(max_length=32)

    def __str__(self):
        return f'user: {self.user}, registration_token: {self.registration_token}'
