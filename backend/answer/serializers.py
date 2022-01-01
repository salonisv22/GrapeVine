from rest_framework import serializers
from .models import Answer
from vote.serializers import DownvoteASerializer
from vote.serializers import UpvoteASerializer
class AnswerSerializer(serializers.ModelSerializer):
    answer_downvoted = DownvoteASerializer(many=True, read_only=True)
    answer_upvoted = UpvoteASerializer(many=True, read_only=True )
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
