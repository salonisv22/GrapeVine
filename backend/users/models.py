from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
import uuid

class Users(AbstractUser):
    
    THEME = [('Dark','Dark'), ('Light','Light')]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length = 50, blank = True, null = True, unique = True)
    email = models.EmailField(_('email address'), unique = True)
    theme = models.CharField(choices = THEME, default = 'Light', max_length = 5)
    profile_picture = models.ImageField(blank = True, null = True)
    phone_no = models.CharField(max_length = 10, blank = True, null = True)
    joined_at = models.DateTimeField(auto_now_add = True)

    REQUIRED_FIELDS = ['email']
    def __str__(self):
        return self.username 