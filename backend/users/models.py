from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
import uuid

class Users(AbstractUser):
    
    THEME = [('Dark','Dark'), ('Light','Light')]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length = 50, null=False, blank=False, unique = True)
    email = models.EmailField(_('email address'), null=False, blank=False, unique = True)
    theme = models.CharField(choices = THEME, default = 'Light', max_length = 5)
    profile_picture = models.ImageField(blank = True, null = True)
    phone_no = models.CharField(max_length = 10, blank = True, null = True)
    joined_at = models.DateTimeField(auto_now_add = True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    def __str__(self):
        return self.username 