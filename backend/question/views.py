from rest_framework import viewsets
from .models import Question
from .serializers import QuestionSerializer
# Create your views here.

class QuestionView(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer