# Generated by Django 4.0 on 2023-08-17 07:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0134_remove_inventoryitem_created_by_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inventoryitem',
            name='created_by_email',
        ),
        migrations.AddField(
            model_name='inventoryitem',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='management.user'),
        ),
    ]