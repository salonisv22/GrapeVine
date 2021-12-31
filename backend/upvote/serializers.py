from rest_framework import serializers
from .models import Upvote

class UpvoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Upvote
        fields = "__all__"
        read_only_fields = ['user'] 
    