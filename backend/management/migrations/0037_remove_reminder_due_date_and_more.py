# Generated by Django 4.0 on 2023-01-10 18:41

import datetime
from django.db import migrations, models
#from django.utils.timezone import utc
from datetime import timezone as utc

class Migration(migrations.Migration):

    dependencies = [
        ('management', '0036_rename_resident_signature_finance_receipt'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reminder',
            name='due_date',
        ),
        migrations.RemoveField(
            model_name='reminder',
            name='end_evaluation_date',
        ),
        migrations.RemoveField(
            model_name='reminder',
            name='next_evaluation_date',
        ),
        migrations.AddField(
            model_name='reminder',
            name='end_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 1, 10, 18, 41, 47, 75547)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reminder',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 1, 10, 18, 41, 53, 591688)),
            preserve_default=False,
        ),
    ]
