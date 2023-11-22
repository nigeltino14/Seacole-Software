# Generated by Django 4.0 on 2023-07-25 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0124_category_inventoryitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventoryitem',
            name='quantity',
            field=models.IntegerField(blank=True, null=True, verbose_name=500),
        ),
        migrations.AlterField(
            model_name='inventoryitem',
            name='category',
            field=models.CharField(max_length=30),
        ),
    ]
