from django.contrib import admin
from .models import Users
from django.contrib.auth.admin import UserAdmin
# Register your models here.

@admin.register(Users)
class CustomUserAdmin(UserAdmin):
    readonly_fields = [
        'password',
    ]
    list_display = [
        'username',
        'email',
        'is_superuser',
    ]
    ordering = ('joined_at', 'username')