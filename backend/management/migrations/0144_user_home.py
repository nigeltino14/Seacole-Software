# Generated by Django 4.0 on 2023-09-12 12:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0143_rename_deleted_inventoryitem_is_deleted'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='home',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.home'),
        ),
    ]
