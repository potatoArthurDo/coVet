# Generated by Django 5.0.4 on 2024-06-24 20:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_appointment_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='service',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, to='api.service'),
        ),
    ]
