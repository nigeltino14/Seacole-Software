# Generated by Django 4.0 on 2023-08-15 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0129_inventoryitem_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventoryitem',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
