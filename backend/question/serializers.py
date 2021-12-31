from rest_framework import serializers
from .models import Question
from downvote.serializers import DownvoteSerializer
from upvote.serializers import UpvoteSerializer
class QuestionSerializer(serializers.ModelSerializer):
    question_downvoted = DownvoteSerializer(many=True, read_only=True)
    question_upvoted = UpvoteSerializer(many=True, read_only=True )
    class Meta:
        model = Question
        fields = "__all__"
        read_only_fields = ['user']

    def to_representation(self, instance):
        data = super(QuestionSerializer, self).to_representation(instance)
        print(data)
        upvotes = len(data['question_upvoted'])
        downvotes = len(data['question_downvoted'])
        data.pop('question_downvoted')
        data.pop('question_upvoted')
        data['upvotes'] = upvotes
        data['downvotes'] = downvotes
        return data
