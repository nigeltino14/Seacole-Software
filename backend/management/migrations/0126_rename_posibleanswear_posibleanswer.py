# Generated by Django 4.0 on 2023-07-26 20:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0125_inventoryitem_quantity_alter_inventoryitem_category'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PosibleAnswear',
            new_name='PosibleAnswer',
        ),
    ]
