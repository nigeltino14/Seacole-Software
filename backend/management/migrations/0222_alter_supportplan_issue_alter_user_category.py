# Generated by Django 5.0.4 on 2024-11-27 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0221_alter_appointment_recur'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supportplan',
            name='issue',
            field=models.CharField(blank=True, max_length=5000, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='category',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
