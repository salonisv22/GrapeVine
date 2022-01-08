from django.db.models.aggregates import Count
from rest_framework import viewsets
from authentication.mixins import ViewsetActionPermissionMixin
from authentication.permissions import IsOwnerOrAdmin
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import *
from .serializers import *
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status
import uuid
from rest_framework import filters
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

class QuestionCommentView(ViewsetActionPermissionMixin, viewsets.ModelViewSet):
    queryset = QuestionComment.objects.all()
    serializer_class = QuestionCommentSerializer
    permission_classes = [IsOwnerOrAdmin]
    action_based_permission_classes = {
        'list':[AllowAny],
        'retrieve': [AllowAny],
    }

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

class QuestionView(ViewsetActionPermissionMixin, viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['title', 'description', 'answers__solution', 'tags__tag']
    ordering_fields = ['questioned_at', 'user__username', 'upvotes', 'answers', 'title']
    action_based_permission_classes = {
      
        'create': [IsAuthenticated],
        'update': [IsOwnerOrAdmin],
        'delete': [IsOwnerOrAdmin]
    }
    def list(self, request, *args, **kwargs):
        order_by = request.GET.get('ordering', False)
        if order_by:
            if order_by == "upvotes":
                queryset = Question.objects.all().annotate(upvotes=Count('q_upvoted')).order_by('-upvotes')
            elif order_by == "answers":
                queryset = Question.objects.all().annotate(answers=Count('answers')).order_by('-answers')
            elif order_by == "-upvotes":
                queryset = Question.objects.all().annotate(upvotes=Count('q_upvoted')).order_by('upvotes')
            elif order_by == "-answers":
                queryset = Question.objects.all().annotate(answers=Count('answers')).order_by('answers')
            else:
                queryset = self.filter_queryset(self.get_queryset())
        else:
            queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = QuestionWithCommentSerializer(instance)
        return Response(serializer.data)

    def user_questions(self, request, *args, **kwargs):
        if request.GET.get('user',False):
            try: 
                uuid.UUID(request.GET.get('user'))
            except ValueError:
                return Response(data={'error':'Invalid UUID'}, status=status.HTTP_400_BAD_REQUEST)
            if Users.objects.filter(pk=request.GET.get('user')).exists():
                objs = Question.objects.filter(Q(user = request.GET.get('user')))
                queryset = self.filter_queryset(objs)
                serializer = self.get_serializer(queryset, many = True)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED, headers=headers)
            return Response(data={'error':'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error':'User field is compulsory'}, status=status.HTTP_400_BAD_REQUEST)
            

    def create(self, request, *args, **kwargs ):
        question = self.get_serializer(data=request.data)
        if question.is_valid():
            question_object = question.save(user = self.request.user)
            if request.data.get('tag_list', False):
                QuestionTagView.addTag( request, question_object.id, *args, **kwargs)
            return Response(data = {'question':question.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(question.errors)
    # def create(self, request, *args, **kwargs):
    #     return super().create(request, *args, **kwargs)

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

  
  
