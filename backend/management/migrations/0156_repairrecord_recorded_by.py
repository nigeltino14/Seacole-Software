# Generated by Django 4.0 on 2023-09-21 08:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0155_alter_repairrecord_house'),
    ]

    operations = [
        migrations.AddField(
            model_name='repairrecord',
            name='recorded_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.user'),
        ),
    ]