# Generated by Django 5.0.4 on 2024-06-27 16:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0044_alter_pet_gender_alter_pet_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pet',
            old_name='image',
            new_name='pet_image',
        ),
    ]