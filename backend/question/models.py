from django.db import models
from users.models import Users
import uuid
# Create your models here.
class Question(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    questioned_at = models.DateTimeField(auto_now_add = True)
    user = models.ForeignKey(Users, on_delete = models.CASCADE, related_name="questioned_by")
    query_title = models.CharField(max_length=50)
    query = models.TextField()
  
class QuestionTag(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    question = models.ForeignKey(Question, on_delete = models.CASCADE, related_name="tags")
    tag = models.CharField(max_length=30)
