# Generated by Django 5.0.4 on 2024-06-25 18:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_alter_appointment_date_alter_appointment_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='date',
            field=models.CharField(default='Tuesday', max_length=50),
        ),
    ]
