from rest_framework import serializers
from .models import Question, QuestionTag
from vote.serializers import DownvoteQSerializer
from vote.serializers import UpvoteQSerializer
class QuestionTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionTag
        fields = "__all__"
class QuestionSerializer(serializers.ModelSerializer):
    q_downvoted = DownvoteQSerializer(many=True, read_only=True)
    q_upvoted = UpvoteQSerializer(many=True, read_only=True )
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
        tag_list = []
        for tag in data['tags']:
            tag_list.append(tag['tag'])
        data['tags'] = tag_list
        return data

