# Generated by Django 5.0.4 on 2024-06-28 20:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0051_remove_pet_appointment_appointment_pet_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='pet_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.pet'),
        ),
    ]
