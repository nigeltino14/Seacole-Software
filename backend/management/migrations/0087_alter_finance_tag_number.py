# Generated by Django 4.0 on 2023-03-24 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0086_remove_finance_staff_witnesses'),
    ]

    operations = [
        migrations.AlterField(
            model_name='finance',
            name='tag_number',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='Tag Number'),
        ),
    ]
