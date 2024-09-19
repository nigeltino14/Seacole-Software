# Generated by Django 5.0.4 on 2024-05-30 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0186_alter_riskactionplan_created_on'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='location',
        ),
        migrations.RemoveField(
            model_name='user',
            name='locations',
        ),
        migrations.AlterField(
            model_name='note',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Created On'),
        ),
    ]
