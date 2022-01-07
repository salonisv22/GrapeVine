from rest_framework import serializers
from .models import *
from vote.serializers import DownvoteAnswerSerializer
from vote.serializers import UpvoteAnswerSerializer
class AnswerCommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = AnswerComment
        fields = "__all__"
        read_only_fields = ['user', 'commented_at']
class AnswerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    a_downvoted = DownvoteAnswerSerializer(many=True, read_only=True)
    a_upvoted = UpvoteAnswerSerializer(many=True, read_only=True )
    class Meta:
        model = Answer
        fields = "__all__"
        read_only_fields = ['user']

    def to_representation(self, instance):
        data = super(AnswerSerializer, self).to_representation(instance)
        data['upvotes'] = len(data['a_upvoted'])
        data['downvotes'] = len(data['a_downvoted'])
        data.pop('a_downvoted')
        data.pop('a_upvoted')
        return data

class AnswerWithCommentSerializer(AnswerSerializer, serializers.ModelSerializer):
    comments = AnswerCommentSerializer(source='comments_on_answer', many=True, read_only=True)