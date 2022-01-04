from django.db import models

from question.models import Question
from answer.models import Answer
from users.models import Users

# Create your models here.
class DownvoteQuestion(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='q_downvoted')
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='q_downvoter')


class UpvoteQuestion(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='q_upvoted')
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='q_upvoter')


class DownvoteAnswer(models.Model):
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='a_downvoted')
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='a_downvoter')


class UpvoteAnswer(models.Model):
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='a_upvoted')
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='a_upvoter')
