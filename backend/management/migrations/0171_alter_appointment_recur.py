# Generated by Django 4.0 on 2023-10-06 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0170_remove_user_nhs_number_remove_user_trur_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='recur',
            field=models.CharField(choices=[('no', 'No'), ('daily', 'Daily'), ('weekly', 'Weekly'), ('monthly', 'Monthly'), ('yearly', 'Yearly')], default=' ', max_length=50),
        ),
    ]
