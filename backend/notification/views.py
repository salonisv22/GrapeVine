from django.http.response import HttpResponse
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from question.models import QuestionComment
from answer.models import AnswerComment, Answer
from notification.models import Notification
from notification.serializers import NotificationSerializer
from vote.models import *
from rest_framework.response import Response
from django.db.models import Q

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
    permission_classes = [IsAuthenticated,]
    ordering = ['-created',]

    http_method_names = ['get',]

    def list(self, request, *args, **kwargs):
        queryset = Notification.objects.filter(Q(user = request.user))
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


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