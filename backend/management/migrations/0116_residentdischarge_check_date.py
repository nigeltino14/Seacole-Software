# Generated by Django 4.0 on 2023-04-24 17:14

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0115_alter_resident_options_residentdischarge_reason'),
    ]

    operations = [
        migrations.AddField(
            model_name='residentdischarge',
            name='check_date',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='check_date'),
        ),
    ]
