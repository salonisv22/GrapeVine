from rest_framework import serializers, viewsets
from rest_framework import permissions
from rest_framework.decorators import permission_classes
from authentication.mixins import ViewsetActionPermissionMixin
from authentication.permissions import IsOwnerOrAdmin
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from .models import Question, QuestionTag
from .serializers import QuestionSerializer, QuestionTagSerializer
from django.db.models import Q, query
from rest_framework.response import Response
from rest_framework import status

import uuid

# Create your views here.
class QuestionTagView(viewsets.ModelViewSet):
    query_set = QuestionTag.objects.all()
    serializer_class = QuestionTagSerializer
    http_method_names = []
    
    @classmethod
    def addTag(cls, request, question, *args, **kwargs):
        tag_list = request.data.get('tag_list')
        for tag in tag_list.split(','):
            serializer = QuestionTagSerializer(data={'question':question, 'tag':tag},context={'request': request})
            serializer.is_valid(raise_exception=True)
            serializer.save()

    @classmethod
    def deleteTag(cls, request, question, *args, **kwargs):
        QuestionTag.objects.filter(Q(question=question)).delete()
      
    @classmethod
    def updateTag(cls, request, question, *args, **kwargs):
        cls.deleteTag(request, question, *args, **kwargs)
        cls.addTag(request, question, *args, **kwargs)

class QuestionView(ViewsetActionPermissionMixin, viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsOwnerOrAdmin]
    action_based_permission_classes = {
        'get':[AllowAny],
        'retrieve': [AllowAny],
    }

    def myQ(self, request, *args, **kwargs):
        objs = Question.objects.filter(Q(user = self.request.user.id))
        queryset = self.filter_queryset(objs)
        serializer = self.get_serializer(queryset, many = True)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED, headers=headers)

    def create(self, request, *args, **kwargs ):
        question = QuestionSerializer(data=request.data,context={'request': request})
        if question.is_valid():
            question_object = question.save(user = self.request.user)
            if request.data.get('tag_list', False):
                QuestionTagView.addTag( request, question_object.id, *args, **kwargs)
            return Response(data = {'question':question.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(question.errors)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        print(kwargs)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        question_object = serializer.save(user = self.request.user)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        if request.data.get('tag_list', False):
            QuestionTagView.updateTag( request, question_object.id, *args, **kwargs)
        else:
            QuestionTagView.deleteTag(request, question_object.id, *args, **kwargs)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        QuestionTagView.deleteTag(request, instance.id, *args, **kwargs)    
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
  
