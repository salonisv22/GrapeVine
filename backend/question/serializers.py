from rest_framework import serializers
from .models import Question
from vote.serializers import DownvoteQSerializer
from vote.serializers import UpvoteQSerializer
class QuestionSerializer(serializers.ModelSerializer):
    question_downvoted = DownvoteQSerializer(many=True, read_only=True)
    question_upvoted = UpvoteQSerializer(many=True, read_only=True )
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
