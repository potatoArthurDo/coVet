# Generated by Django 5.0.4 on 2024-06-27 16:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0046_rename_pet_image_pet_picture'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pet',
            old_name='picture',
            new_name='file',
        ),
    ]
