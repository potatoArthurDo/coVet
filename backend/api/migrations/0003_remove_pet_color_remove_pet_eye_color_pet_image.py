# Generated by Django 5.0.4 on 2024-05-17 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_employee_service_alter_pet_owner_id_appointment_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pet',
            name='color',
        ),
        migrations.RemoveField(
            model_name='pet',
            name='eye_color',
        ),
        migrations.AddField(
            model_name='pet',
            name='image',
            field=models.ImageField(default='default.jpg', upload_to=''),
        ),
    ]