# Generated by Django 4.0 on 2023-02-05 17:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0054_alter_appointment_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='rota_Category',
        ),
    ]
