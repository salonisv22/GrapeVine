from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Question, QuestionComment, QuestionTag
from vote.serializers import DownvoteQuestionSerializer
from vote.serializers import UpvoteQuestionSerializer

class QuestionCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionComment
        fields = "__all__"
        read_only_fields = ['user', 'commented_at']

class QuestionTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionTag
        fields = "__all__"

     
class QuestionSerializer(serializers.ModelSerializer):
    q_downvoted = DownvoteQuestionSerializer(many=True, read_only=True)
    q_upvoted = UpvoteQuestionSerializer(many=True, read_only=True )
    tags = QuestionTagSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = "__all__"
        read_only_fields = ['user']

    def to_representation(self, instance):
        data = super(QuestionSerializer, self).to_representation(instance)
        data['upvotes'] = len(data['q_upvoted'])
        data['downvotes'] = len(data['q_downvoted'])
        data.pop('q_downvoted')
        data.pop('q_upvoted')
        data['tags']  = [tag['tag'] for tag in data['tags']]
        return data

class QuestionWithCommentSerializer(QuestionSerializer, serializers.ModelSerializer):
    comments = QuestionCommentSerializer(many=True, read_only=True)
    
