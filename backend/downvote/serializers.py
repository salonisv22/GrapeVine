from rest_framework import serializers
from .models import Downvote

class DownvoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Downvote
        fields = "__all__"
        read_only_fields = ['user'] 
    