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
class UpvoteQuestionView(viewsets.ModelViewSet):
    queryset = UpvoteQuestion.objects.all()
    serializer_class = UpvoteQuestionSerializer
    permission_classes = [IsAuthenticated]

    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        try: 
            uuid.UUID(request.data.get('question'))
        except ValueError:
            return Response(data={'error':'Invalid UUID'}, status=status.HTTP_400_BAD_REQUEST)
        if Question.objects.filter(pk=request.data.get('question')).exists():
            DownvoteQuestion.objects.filter(Q(user = self.request.user.id, question = request.data.get('question'))).delete()
            already_upvoted = UpvoteQuestion.objects.filter(Q(user = self.request.user.id, question = request.data.get('question')))
            if not already_upvoted:
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save(user = request.user)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            already_upvoted.delete()
            return Response(data={'sucess':'Upvote removed'}, status=status.HTTP_204_NO_CONTENT)
        return Response(data={'error':'question id does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class UpvoteAnswerView(viewsets.ModelViewSet):
    queryset = UpvoteAnswer.objects.all()
    serializer_class = UpvoteAnswerSerializer
    permission_classes = [IsAuthenticated]

    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        try: 
            uuid.UUID(request.data.get('answer'))
        except ValueError:
            return Response(data={'error':'Invalid UUID'}, status=status.HTTP_400_BAD_REQUEST)
        if Answer.objects.filter(pk=request.data.get('answer')).exists():
            DownvoteAnswer.objects.filter(Q(user = self.request.user.id, answer = request.data.get('answer'))).delete()
            already_upvoted = UpvoteAnswer.objects.filter(Q(user = self.request.user.id, answer = request.data.get('answer')))
            if not already_upvoted:
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save(user = request.user)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            already_upvoted.delete()
            return Response(data={'error':'You have already upvoted'})
        return Response(data={'error':'answer id does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class DownvoteQuestionView(viewsets.ModelViewSet):
    queryset = DownvoteQuestion.objects.all()
    serializer_class = DownvoteQuestionSerializer
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
                already_downvoted = DownvoteQuestion.objects.filter(Q(user = self.request.user.id, question = request.data.get('question')))
                if not already_downvoted:
                    serializer = self.get_serializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save(user = request.user)
                    headers = self.get_success_headers(serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                already_downvoted.delete()
                return Response(data={'sucess':'Downvote removed'})
            return Response(data={'error':'question id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error': 'question is required field'}, status=status.HTTP_400_BAD_REQUEST)

class DownvoteAnswerView(viewsets.ModelViewSet):

    queryset = DownvoteAnswer.objects.all()
    serializer_class = DownvoteAnswerSerializer
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
                already_downvoted = DownvoteAnswer.objects.filter(Q(user = self.request.user.id, answer = request.data.get('answer')))
                if not already_downvoted:
                    serializer = self.get_serializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save(user = request.user)
                    headers = self.get_success_headers(serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                already_downvoted.delete()
                return Response(data={'success':'Downvote removed'})
            return Response(data={'error':'answer id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error': 'answer is required field'}, status=status.HTTP_400_BAD_REQUEST)

    
    