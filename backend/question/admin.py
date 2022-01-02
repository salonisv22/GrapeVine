from django.contrib import admin
from .models import Question, QuestionTag
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