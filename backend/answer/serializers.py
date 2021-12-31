from rest_framework import serializers
from .models import Answer
from downvote.serializers import DownvoteSerializer
from upvote.serializers import UpvoteSerializer
class AnswerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Answer
        fields = "__all__"
        read_only_fields = ['user']

    
