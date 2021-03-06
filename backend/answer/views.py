from rest_framework import viewsets
from authentication.mixins import ViewsetActionPermissionMixin
from authentication.permissions import IsOwnerOrAdmin
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import *
from .serializers import *
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status
from rest_framework import filters
from django.db.models.aggregates import Count

class AnswerCommentView(ViewsetActionPermissionMixin, viewsets.ModelViewSet):
    queryset = AnswerComment.objects.all()
    serializer_class = AnswerCommentSerializer
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


class AnswerView(ViewsetActionPermissionMixin, viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['solution', ]
    ordering_fields = ['answered_at', 'user__username', 'upvotes']
    action_based_permission_classes = {
        
        'create': [IsAuthenticated],
        'update': [IsOwnerOrAdmin],
        'delete': [IsOwnerOrAdmin]
        
    }

    def user_answers(self, request, *args, **kwargs):
        if request.GET.get('user',False):
            try: 
                uuid.UUID(request.GET.get('user'))
            except ValueError:
                return Response(data={'error':'Invalid UUID'}, status=status.HTTP_400_BAD_REQUEST)
            if Users.objects.filter(pk=request.GET.get('user')).exists():
                objs = Answer.objects.filter(Q(user = request.GET.get('user')))
                queryset = self.filter_queryset(objs)
                serializer = self.get_serializer(queryset, many = True)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED, headers=headers)
            return Response(data={'error':'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error':'User field is compulsory'}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        order_by = request.GET.get('ordering', False)
        if order_by:
            if order_by == "upvotes":
                queryset = Answer.objects.all().annotate(upvotes=Count('a_upvoted')).order_by('-upvotes')
            elif order_by == "-upvotes":
                queryset = Answer.objects.all().annotate(upvotes=Count('a_upvoted')).order_by('upvotes')
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

    def create(self, request, *args, **kwargs ):
        answer = AnswerSerializer(data=request.data,context={'request': request})
        if answer.is_valid():
            answer.save(user = self.request.user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(answer.errors)
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = AnswerWithCommentSerializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        print(kwargs)
        instance = self.get_object()
        if instance.user == self.request.user:
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(serializer.data)
        return Response(status=status.HTTP_403_FORBIDDEN)


    def perform_update(self, serializer):
        serializer.save(user = self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user == self.request.user:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)