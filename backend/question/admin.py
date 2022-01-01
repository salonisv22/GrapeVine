from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'user',
        'questioned_at',
    ]
    ordering = ('questioned_at', 'id')

@admin.register(QuestionTag)
class QuestionTagAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'question',
        'tag'
    ]
    ordering = ('tag',)

@admin.register(QuestionComment)
class QuestionCommentAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'question',
        'user',
        'comment'
    ]
    ordering = ('commented_at',)
