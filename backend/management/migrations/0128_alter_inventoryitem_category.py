# Generated by Django 4.0 on 2023-08-08 13:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0127_rename_name_inventoryitem_item_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventoryitem',
            name='category',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
