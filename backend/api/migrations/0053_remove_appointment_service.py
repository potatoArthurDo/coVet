# Generated by Django 5.0.4 on 2024-06-28 21:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0052_alter_appointment_pet_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='service',
        ),
    ]
