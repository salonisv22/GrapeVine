import uuid
from .models import *
from .serializers import *
from question.models import Question
from django.db.models import Q 

from rest_framework import viewsets 
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from authentication.mixins import ViewsetActionPermissionMixin

# Create your views here.
class UpvoteQuestionView(ViewsetActionPermissionMixin, viewsets.ModelViewSet):
    queryset = UpvoteQuestion.objects.all()
    serializer_class = UpvoteQuestionSerializer
    permission_classes = [IsAuthenticated]
    action_based_permission_classes = {
      
        'list': [AllowAny],
     
    }
   
    http_method_names = ['post', 'get']

    def list(self, request, *args, **kwargs):
        if request.data.get('user',False):
            try: 
                uuid.UUID(request.data.get('user'))
            except ValueError:
                return Response(data={'error':'Invalid UUID'}, status=status.HTTP_400_BAD_REQUEST)
            if Users.objects.filter(pk=request.data.get('user')).exists():
                objs = UpvoteQuestion.objects.filter(Q(user = request.data.get('user')))
                queryset = self.filter_queryset(objs)
                serializer = self.get_serializer(queryset, many = True)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED, headers=headers)
            return Response(data={'error':'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error':'User field is compulsory'}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        if request.data.get('question',False):
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
                return Response(data={'sucess':'Upvote removed'}, status=status.HTTP_202_ACCEPTED)
            return Response(data={'error':'question id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error':'question field is compulsory'}, status=status.HTTP_400_BAD_REQUEST)

class UpvoteAnswerView(ViewsetActionPermissionMixin, viewsets.ModelViewSet):
    queryset = UpvoteAnswer.objects.all()
    serializer_class = UpvoteAnswerSerializer
    permission_classes = [IsAuthenticated]
    action_based_permission_classes = {
      
        'list': [AllowAny],
     
    }

    http_method_names = ['post', 'get']

    def list(self, request, *args, **kwargs):
        if request.data.get('user',False):
            try: 
                uuid.UUID(request.data.get('user'))
            except ValueError:
                return Response(data={'error':'Invalid UUID'}, status=status.HTTP_400_BAD_REQUEST)
            if Users.objects.filter(pk=request.data.get('user')).exists():
                objs = UpvoteAnswer.objects.filter(Q(user = request.data.get('user')))
                queryset = self.filter_queryset(objs)
                serializer = self.get_serializer(queryset, many = True)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED, headers=headers)
            return Response(data={'error':'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error':'User field is compulsory'}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        if request.data.get('answer',False):
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
                return Response(data={'sucess':'Upvote removed'})
            return Response(data={'error':'answer id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error':'answer field is compulsory'}, status=status.HTTP_400_BAD_REQUEST)

class DownvoteQuestionView(ViewsetActionPermissionMixin, viewsets.ModelViewSet):
    queryset = DownvoteQuestion.objects.all()
    serializer_class = DownvoteQuestionSerializer
    permission_classes = [IsAuthenticated]
    action_based_permission_classes = {
      
        'list': [AllowAny],
     
    }

    http_method_names = ['post', 'get']

    def list(self, request, *args, **kwargs):
        if request.data.get('user',False):
            try: 
                uuid.UUID(request.data.get('user'))
            except ValueError:
                return Response(data={'error':'Invalid UUID'}, status=status.HTTP_400_BAD_REQUEST)
            if Users.objects.filter(pk=request.data.get('user')).exists():
                objs = DownvoteQuestion.objects.filter(Q(user = request.data.get('user')))
                queryset = self.filter_queryset(objs)
                serializer = self.get_serializer(queryset, many = True)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED, headers=headers)
            return Response(data={'error':'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error':'User field is compulsory'}, status=status.HTTP_400_BAD_REQUEST)

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

class DownvoteAnswerView(ViewsetActionPermissionMixin, viewsets.ModelViewSet):

    queryset = DownvoteAnswer.objects.all()
    serializer_class = DownvoteAnswerSerializer
    permission_classes = [IsAuthenticated]
    action_based_permission_classes = {
      
        'list': [AllowAny],
     
    }

    http_method_names = ['post','get']

    def list(self, request, *args, **kwargs):
        if request.data.get('user',False):
            try: 
                uuid.UUID(request.data.get('user'))
            except ValueError:
                return Response(data={'error':'Invalid UUID'}, status=status.HTTP_400_BAD_REQUEST)
            if Users.objects.filter(pk=request.data.get('user')).exists():
                objs = DownvoteAnswer.objects.filter(Q(user = request.data.get('user')))
                queryset = self.filter_queryset(objs)
                serializer = self.get_serializer(queryset, many = True)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED, headers=headers)
            return Response(data={'error':'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error':'User field is compulsory'}, status=status.HTTP_400_BAD_REQUEST)

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

    
    