# Generated by Django 5.0.4 on 2024-06-23 20:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_remove_pet_date_of_birth_pet_fixed_pet_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pet',
            name='image',
        ),
    ]
