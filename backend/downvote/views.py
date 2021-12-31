import uuid

from question.models import Question

from .models import Downvote
from upvote.models import Upvote
from .serializers import DownvoteSerializer
from django.db.models import Q 

from rest_framework import viewsets 
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
class DownvoteView(viewsets.ModelViewSet):
    queryset = Downvote.objects.all()
    serializer_class = DownvoteSerializer
    permission_classes = [IsAuthenticated]

    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        if request.data.get('question', False):
            try: 
                uuid.UUID(request.data.get('question'))
            except ValueError:
                return Response(data={'error':'Invalid UUID'}, status=status.HTTP_400_BAD_REQUEST)
            if Question.objects.filter(pk=request.data.get('question')).exists():
                Upvote.objects.filter(Q(user = self.request.user.id, question = request.data.get('question'))).delete()
                objs = Downvote.objects.filter(Q(user = self.request.user.id, question = request.data.get('question')))
                print(objs)
                if not objs:
                    serializer = self.get_serializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save(user = request.user)
                    headers = self.get_success_headers(serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                return Response(data={'error':'You have already downvoted'})
            return Response(data={'error':'question id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'error': 'question is required field'}, status=status.HTTP_400_BAD_REQUEST)

    