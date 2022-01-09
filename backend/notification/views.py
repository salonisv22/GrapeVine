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
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class TempView(viewsets.GenericViewSet):

    def create(self, request, *args, **kwargs):
        current_user = request.user # Getting current user
        channel_layer = get_channel_layer()
        data = "notification"+ "...." # Pass any data based on your requirement
        # Trigger message sent to group
        async_to_sync(channel_layer.group_send)(
            str("c684d068-aea6-481d-bdf7-613b1272dac9"),  # Group Name, Should always be string
            {
                "type": "chatroom_message",   # Custom Function written in the consumers.py
                "data": data,
            },
        )  

        return Response({"msg":"success"}, status=200)



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
            obj = serializer.save()
            noti = NotificationSerializer(instance=obj).data
            channel_layer = get_channel_layer()
            print(instance.user.id)
            print(noti)
            async_to_sync(channel_layer.group_send)(
                str(instance.user.id),  # Group Name, Should always be string
                {
                    "type": "send_notification",   # Custom Function written in the consumers.py
                    "data": serializer.data,
                },
            )  

           
