from django.db import models
from question.models import Question
from users.models import Users
import uuid
from django.utils import timezone
# Create your models here.
class Answer(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    answered_at = models.DateTimeField(auto_now_add = True)
    user = models.ForeignKey(Users, on_delete = models.CASCADE, related_name="answered_by")
    solution = models.TextField()
    question = models.ForeignKey(Question, on_delete= models.CASCADE, related_name="associated_q")

class AnswerComment(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    answer = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="comments_on_answer")
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="commentor_of_answer")
    comment = models.TextField()
    commented_at = models.DateTimeField(default=timezone.now, editable=False)