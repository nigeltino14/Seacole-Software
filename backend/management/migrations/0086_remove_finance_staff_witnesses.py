# Generated by Django 4.0 on 2023-03-24 14:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0085_alter_finance_transaction_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='finance',
            name='staff_witnesses',
        ),
    ]
