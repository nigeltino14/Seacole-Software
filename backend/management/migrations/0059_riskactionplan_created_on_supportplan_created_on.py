# Generated by Django 4.0 on 2023-02-10 11:03

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0058_remove_supportplan_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='riskactionplan',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Created On'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='supportplan',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Created On'),
            preserve_default=False,
        ),
    ]
