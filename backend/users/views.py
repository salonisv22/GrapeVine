from rest_framework import viewsets
from .models import Users
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.response import Response
# Create your views here.

class UserView(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        serializer.save(is_active = True)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if instance.id == self.request.user:
            if self.request.data.get('previous_password', False):
                if instance.check_password(self.request.data.get('previous_password')):
                    serializer = self.get_serializer(instance, data=request.data, partial=partial)
                    serializer.is_valid(raise_exception=True)
                    self.perform_update(serializer)

                    if getattr(instance, '_prefetched_objects_cache', None):
                        # If 'prefetch_related' has been applied to a queryset, we need to
                        # forcibly invalidate the prefetch cache on the instance.
                        instance._prefetched_objects_cache = {}

                    return Response(serializer.data)
                return Response(data={'error': "Password doesn't match"},status=status.HTTP_400_BAD_REQUEST)
            return Response(data={'error': "previous_password can't be empty"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.is_superuser or request.user == instance.id :
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)

  

    
