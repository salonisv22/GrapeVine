from rest_framework import viewsets
from authentication.mixins import ViewsetActionPermissionMixin
from authentication.permissions import IsOwnerOrAdmin
from rest_framework.permissions import AllowAny
from .models import Answer
from .serializers import AnswerSerializer
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status



# Create your views here.

class AnswerView(ViewsetActionPermissionMixin, viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsOwnerOrAdmin]
    action_based_permission_classes = {
      
        'retrieve': [AllowAny],
        
    }

    def allQ(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        objs = Answer.objects.filter(Q(user = self.request.user.id))
        queryset = self.filter_queryset(objs)
        serializer = self.get_serializer(queryset, many = True)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED, headers=headers)

    def create(self, request, *args, **kwargs ):
        answer = AnswerSerializer(data=request.data,context={'request': request})
        if answer.is_valid():
            answer.save(user = self.request.user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(answer.errors)

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