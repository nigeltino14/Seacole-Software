# Generated by Django 4.0 on 2023-11-15 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0181_allowedlocations_allowed_groups'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='created_on',
            field=models.DateField(auto_now_add=True, verbose_name='Created On'),
        ),
    ]
