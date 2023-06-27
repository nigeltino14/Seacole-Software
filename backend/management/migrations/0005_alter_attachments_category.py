# Generated by Django 4.0 on 2022-12-07 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0004_alter_appointment_status_alter_reminder_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attachments',
            name='category',
            field=models.CharField(choices=[('GeneralInfo', 'GeneralInfo'), ('Resident', 'Resident'), ('Finance', 'Finance'), ('Home', 'Home')], max_length=60),
        ),
    ]