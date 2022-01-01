from rest_framework import serializers
from .models import *

class UpvoteQSerializer(serializers.ModelSerializer):

    class Meta:
        model = UpvoteQuestion
        fields = "__all__"
        read_only_fields = ['user'] 

class DownvoteQSerializer(serializers.ModelSerializer):

    class Meta:
        model = DownvoteQuestion
        fields = "__all__"
        read_only_fields = ['user'] 
    
class UpvoteASerializer(serializers.ModelSerializer):

    class Meta:
        model = UpvoteAnswer
        fields = "__all__"
        read_only_fields = ['user'] 

class DownvoteASerializer(serializers.ModelSerializer):

    class Meta:
        model = DownvoteAnswer
        fields = "__all__"
        read_only_fields = ['user'] 
    