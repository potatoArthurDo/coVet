# Generated by Django 5.0.4 on 2024-06-25 19:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_delete_demo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='date',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='date_created',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='note',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='pet_id',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='service',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='status',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='time',
        ),
    ]