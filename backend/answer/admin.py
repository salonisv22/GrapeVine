from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'user',
        'answered_at',
    ]
    ordering = ('answered_at', 'id')

@admin.register(AnswerComment)
class AnswerCommentAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'answer',
        'user',
        'comment'
    ]
    ordering = ('commented_at',)