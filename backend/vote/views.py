import uuid
from .models import *
from .serializers import *
from question.models import Question
from django.db.models import Q 

from rest_framework import viewsets 
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
class UpvoteQView(viewsets.ModelViewSet):
    queryset = UpvoteQuestion.objects.all()
    serializer_class = UpvoteQSerializer
    permission_classes = [IsAuthenticated]

    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        if request.data.get('question', False):
            try: 
                uuid.UUID(request.data.get('question'))
            except ValueError:
                return Response(data={'error':'Invalid UUID'}, status=status.HTTP_400_BAD_REQUEST)
            if Question.objects.filter(pk=request.data.get('question')).exists():
                DownvoteQuestion.objects.filter(Q(user = self.request.user.id, question = request.data.get('question'))).delete()
                objs = UpvoteQuestion.objects.filter(Q(user = self.request.user.id, question = request.data.get('question')))
                print(objs)
                if not objs:
                    serializer = self.get_serializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save(user = request.user)
                    headers = self.get_success_headers(serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                return Response(data={'error':'You have already upvoted'})
            return Response(data={'error':'question id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error': 'question is required field'}, status=status.HTTP_400_BAD_REQUEST)

class UpvoteAView(viewsets.ModelViewSet):
    queryset = UpvoteAnswer.objects.all()
    serializer_class = UpvoteASerializer
    permission_classes = [IsAuthenticated]

    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        if request.data.get('answer', False):
            try: 
                uuid.UUID(request.data.get('answer'))
            except ValueError:
                return Response(data={'error':'Invalid UUID'}, status=status.HTTP_400_BAD_REQUEST)
            if Answer.objects.filter(pk=request.data.get('answer')).exists():
                DownvoteAnswer.objects.filter(Q(user = self.request.user.id, answer = request.data.get('answer'))).delete()
                objs = UpvoteAnswer.objects.filter(Q(user = self.request.user.id, answer = request.data.get('answer')))
                if not objs:
                    serializer = self.get_serializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save(user = request.user)
                    headers = self.get_success_headers(serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                return Response(data={'error':'You have already upvoted'})
            return Response(data={'error':'answer id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error': 'answer is required field'}, status=status.HTTP_400_BAD_REQUEST)

class DownvoteQView(viewsets.ModelViewSet):
    queryset = DownvoteQuestion.objects.all()
    serializer_class = DownvoteQSerializer
    permission_classes = [IsAuthenticated]

    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        if request.data.get('question', False):
            try: 
                uuid.UUID(request.data.get('question'))
            except ValueError:
                return Response(data={'error':'Invalid UUID'}, status=status.HTTP_400_BAD_REQUEST)
            if Question.objects.filter(pk=request.data.get('question')).exists():
                UpvoteQuestion.objects.filter(Q(user = self.request.user.id, question = request.data.get('question'))).delete()
                objs = DownvoteQuestion.objects.filter(Q(user = self.request.user.id, question = request.data.get('question')))
                if not objs:
                    serializer = self.get_serializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save(user = request.user)
                    headers = self.get_success_headers(serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                return Response(data={'error':'You have already downvoted'})
            return Response(data={'error':'question id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error': 'question is required field'}, status=status.HTTP_400_BAD_REQUEST)

class DownvoteAView(viewsets.ModelViewSet):

    queryset = DownvoteAnswer.objects.all()
    serializer_class = DownvoteASerializer
    permission_classes = [IsAuthenticated]

    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        if request.data.get('answer', False):
            try: 
                uuid.UUID(request.data.get('answer'))
            except ValueError:
                return Response(data={'error':'Invalid UUID'}, status=status.HTTP_400_BAD_REQUEST)
            if Answer.objects.filter(pk=request.data.get('answer')).exists():
                UpvoteAnswer.objects.filter(Q(user = self.request.user.id, answer = request.data.get('answer'))).delete()
                objs = DownvoteAnswer.objects.filter(Q(user = self.request.user.id, answer = request.data.get('answer')))
                if not objs:
                    serializer = self.get_serializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save(user = request.user)
                    headers = self.get_success_headers(serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                return Response(data={'error':'You have already downvoted'})
            return Response(data={'error':'answer id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error': 'answer is required field'}, status=status.HTTP_400_BAD_REQUEST)

    
    