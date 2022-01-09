from django.db import models
from users.models import Users
import uuid

# Create your models here.

class Notification(models.Model):

    ACTION = [('commented','commented'), ('upvoted','upvoted'), ('downvoted','downvoted'), ('answered','answered')]
    POST = [('answer','answer'), ('question', 'question')]

    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    sender = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="sender")
    action = models.TextField(choices=ACTION, max_length=15, default="answered")
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="reciever")
    at = models.DateTimeField(auto_now_add=True)
    post = models.TextField(choices=POST, max_length=9, default='question')
    post_id = models.UUIDField(default = uuid.uuid4)
    description = models.TextField()

    def __str__(self):
        return self.description


