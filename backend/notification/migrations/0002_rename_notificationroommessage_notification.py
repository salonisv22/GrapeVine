# Generated by Django 4.0 on 2022-01-09 13:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
        ('notification', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='NotificationRoomMessage',
            new_name='Notification',
        ),
    ]