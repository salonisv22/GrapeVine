from django.contrib import admin
from .models import Downvote
# Register your models here.

@admin.register(Downvote)
class UpvoteAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'user',
        'question',
    ]