# Generated by Django 4.0 on 2022-12-08 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0021_medication'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='type_of_note',
            field=models.CharField(choices=[('day', 'day'), ('night', 'night')], default='day', max_length=50),
        ),
    ]
