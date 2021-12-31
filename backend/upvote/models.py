from django.db import models

from question.models import Question
from users.models import Users

# Create your models here.
class Upvote(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question_upvoted')
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='upvoter')

    class Meta:
        unique_together = (("question", "user"),)