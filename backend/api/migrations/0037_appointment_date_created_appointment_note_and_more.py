# Generated by Django 5.0.4 on 2024-06-26 07:28

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0036_appointment_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='appointment',
            name='note',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='appointment',
            name='pet_id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='appointment',
            name='service',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.service'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='status',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.status'),
        ),
        migrations.AddField(
            model_name='appointment',
            name='time',
            field=models.CharField(default='7:00:00', max_length=50),
        ),
    ]