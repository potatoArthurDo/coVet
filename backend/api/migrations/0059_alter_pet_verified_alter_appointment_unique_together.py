# Generated by Django 5.0.4 on 2024-07-04 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0058_veterinary_alter_shift_doctor_delete_doctor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='verified',
            field=models.CharField(choices=[('unverified', 'Unverified'), ('verified', 'Verified')], default='unverified', max_length=50),
        ),
        migrations.AlterUniqueTogether(
            name='appointment',
            unique_together={('date', 'time')},
        ),
    ]