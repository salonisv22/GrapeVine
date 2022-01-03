from rest_framework import serializers
from .models import *

class UpvoteQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = UpvoteQuestion
        fields = "__all__"
        read_only_fields = ['user'] 

class DownvoteQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = DownvoteQuestion
        fields = "__all__"
        read_only_fields = ['user'] 
    
class UpvoteAnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = UpvoteAnswer
        fields = "__all__"
        read_only_fields = ['user'] 

class DownvoteAnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = DownvoteAnswer
        fields = "__all__"
        read_only_fields = ['user'] 
    