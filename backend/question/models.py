from django.db import models
from users.models import Users
import uuid
# Create your models here.
class Question(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    questioned_at = models.DateTimeField(auto_now_add = True)
    questioned_by = models.ForeignKey(Users, on_delete = models.CASCADE)
    query = models.TextField()
    upvotes = models.IntegerField(default = 0)
    downvotes = models.IntegerField(default = 0)