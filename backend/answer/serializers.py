from rest_framework import serializers
from .models import *
from vote.serializers import DownvoteAnswerSerializer
from vote.serializers import UpvoteAnswerSerializer
class AnswerCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerComment
        fields = "__all__"
        read_only_fields = ['user', 'commented_at']
class AnswerSerializer(serializers.ModelSerializer):
    answer_downvoted = DownvoteAnswerSerializer(many=True, read_only=True)
    answer_upvoted = UpvoteAnswerSerializer(many=True, read_only=True )
    class Meta:
        model = Answer
        fields = "__all__"
        read_only_fields = ['user']

    def to_representation(self, instance):
        data = super(AnswerSerializer, self).to_representation(instance)
        data['upvotes'] = len(data['answer_upvoted'])
        data['downvotes'] = len(data['answer_downvoted'])
        data.pop('answer_downvoted')
        data.pop('answer_upvoted')
        return data

class AnswerWithCommentSerializer(AnswerSerializer, serializers.ModelSerializer):
    comments_on_answer = AnswerCommentSerializer(many=True, read_only=True)