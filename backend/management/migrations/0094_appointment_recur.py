# Generated by Django 4.0 on 2023-03-25 07:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0093_remove_supportplan_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='recur',
            field=models.CharField(choices=[('daily', 'Daily'), ('weekly', 'Weekly'), ('monthly', 'Monthly'), ('yearly', 'Yearly')], default='no', max_length=50),
        ),
    ]
