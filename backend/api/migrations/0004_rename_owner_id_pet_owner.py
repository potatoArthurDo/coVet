# Generated by Django 5.0.4 on 2024-05-17 09:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_pet_color_remove_pet_eye_color_pet_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pet',
            old_name='owner_id',
            new_name='owner',
        ),
    ]
