from django.http.response import HttpResponse
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework import serializers, viewsets
from question.models import QuestionComment
from answer.models import AnswerComment, Answer
from notification.models import Notification
from notification.serializers import NotificationSerializer
from vote.models import *

def index(request):
    return HttpResponse('''
    <h1>hello</h1> 
    <script>
    var socket = new WebSocket('ws://127.0.0.1:8000/ws/notifications/');
    socket.onmessage = function(event){
        var data = JSON.parse(event.data);
        console.log(data);
    }
    </script>''')


class NotificationView(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    @receiver(post_save, sender=UpvoteQuestion)
    @receiver(post_save, sender=DownvoteQuestion)
    @receiver(post_save, sender=UpvoteAnswer)
    @receiver(post_save, sender=DownvoteQuestion)
    @receiver(post_save, sender=QuestionComment)
    @receiver(post_save, sender=AnswerComment)
    @receiver(post_save, sender=Answer)
    def notify_user(sender, instance, created, **kwargs):
        if created:
            if(sender == UpvoteQuestion):
                
                serializer = NotificationSerializer(
                    data={
                        'sender':instance.user.id, 
                        'action':'upvoted', 
                        'user':instance.question.user.id, 
                        'post':'question', 
                        'post_id':instance.question.id, 
                        'description':"Your question was upvoted" 
                        }
                    )
            elif(sender == DownvoteQuestion):
                
                serializer = NotificationSerializer(
                    data={
                        'sender':instance.user.id, 
                        'action':'downvoted', 
                        'user':instance.question.user.id, 
                        'post':'question', 
                        'post_id':instance.question.id, 
                        'description':"Your question was downvoted" 
                        }
                    )
            elif(sender == UpvoteAnswer):
                
                serializer = NotificationSerializer(
                    data={
                        'sender':instance.user.id, 
                        'action':'upvoted', 
                        'user':instance.answer.user.id, 
                        'post':'answer', 
                        'post_id':instance.answer.id, 
                        'description':"Your answer was upvoted" 
                        }
                    )
            elif(sender == DownvoteAnswer):
                
                serializer = NotificationSerializer(
                    data={
                        'sender':instance.user.id, 
                        'action':'downvoted', 
                        'user':instance.answer.user.id, 
                        'post':'answer', 
                        'post_id':instance.answer.id, 
                        'description':"Your answer was downvoted" 
                        }
                    )
            elif(sender == QuestionComment):

                serializer = NotificationSerializer(
                    data={
                        'sender':instance.user.id, 
                        'action':'commented', 
                        'user':instance.question.user.id, 
                        'post':'question', 
                        'post_id':instance.question.id, 
                        'description':"You have a comment on your question : "+instance.comment 
                    }
                )
            elif(sender == AnswerComment):

                serializer = NotificationSerializer(
                    data={
                        'sender':instance.user.id, 
                        'action':'commented', 
                        'user':instance.answer.user.id, 
                        'post':'answer', 
                        'post_id':instance.answer.id, 
                        'description':"You have a comment on your answer "+instance.comment 
                    }
                )
            elif(sender == Answer):

                serializer = NotificationSerializer(
                    data={
                        'sender':instance.user.id, 
                        'action':'answered', 
                        'user':instance.user.id, 
                        'post':'answer', 
                        'post_id':instance.id, 
                        'description':"You have been answered" 
                    }
                )
            serializer.is_valid(raise_exception=True)
            serializer.save()