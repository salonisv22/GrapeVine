from django.contrib import admin

from notification.models import Notification

# Register your models here.
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'sender',
        'user',
        'action',
        'post',
        'post_id'
    ]
    ordering = ('at',)