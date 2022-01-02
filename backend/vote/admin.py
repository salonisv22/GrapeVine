from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(UpvoteQuestion)
class UpvoteQAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'user',
        'question',
    ]


@admin.register(DownvoteQuestion)
class DownvoteQAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'user',
        'question',
    ]

@admin.register(UpvoteAnswer)
class UpvoteAAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'user',
        'answer',
    ]


@admin.register(DownvoteAnswer)
class DownvoteAAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'user',
        'answer',
    ]