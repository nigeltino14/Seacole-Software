# Generated by Django 4.0 on 2023-08-24 10:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0140_userhistory_details'),
    ]

    operations = [
        migrations.AddField(
            model_name='resident',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.user'),
        ),
    ]
