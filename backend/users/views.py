from rest_framework import viewsets

from authentication.permissions import IsOwnerOrAdmin
from .models import Users
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q
# Create your views here.

class UserView(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permissions_classes = [IsOwnerOrAdmin]
    action_based_permission_classes = {
        'list':[AllowAny],
        'retrieve': [AllowAny],
        'create': [IsAuthenticated]
    }

    def me(self, request, *args, **kwargs):
        instance = Users.objects.filter(Q(id = self.request.user.id))[0]
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(is_active = True)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if instance.id == request.user.id:
            if self.request.data.get('current_password', False):
                if instance.check_password(self.request.data.get('current_password')):
                    serializer = self.get_serializer(instance, data=request.data, partial=partial)
                    serializer.is_valid(raise_exception=True)
                    self.perform_update(serializer)

                    if getattr(instance, '_prefetched_objects_cache', None):
                        # If 'prefetch_related' has been applied to a queryset, we need to
                        # forcibly invalidate the prefetch cache on the instance.
                        instance._prefetched_objects_cache = {}

                    return Response(serializer.data)
                return Response(data={'error': "Password doesn't match"},status=status.HTTP_400_BAD_REQUEST) 
            return Response(data={'error': "currnet_password can't be empty"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error':"You are not authorised to do this action"},status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.is_superuser or request.user.id == instance.id :
            if self.request.data.get('current_password', False):
                if instance.check_password(self.request.data.get('current_password')):
                    self.perform_destroy(instance)
                    return Response(status=status.HTTP_204_NO_CONTENT)
                return Response(data={'error': "Password doesn't match"},status=status.HTTP_400_BAD_REQUEST) 
            return Response(data={'error': "currnet_password can't be empty"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_403_FORBIDDEN)