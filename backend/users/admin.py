from django.contrib import admin
from .models import Users
from django.contrib.auth.admin import UserAdmin
# Register your models here.

class CustomUserAdmin(UserAdmin):
    readonly_fields = [
        'password',
    ]
    list_display = [
        'username',
        'email',
        'is_superuser',
    ]
    fieldsets = (
        (None, {'fields': ('email', 'password', 'profile_picture', 'theme', 'phone_no')}),
       
        ('Permissions', {'fields': ('is_superuser',)}),
    )
    ordering = ('joined_at', 'username')

admin.site.register(Users, CustomUserAdmin)
