# Generated by Django 4.0 on 2023-09-29 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0159_houseassets_value'),
    ]

    operations = [
        migrations.AddField(
            model_name='houseassets',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
    ]