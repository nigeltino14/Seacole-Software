# Generated by Django 4.0 on 2023-03-22 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0084_handoverpayment_payment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='finance',
            name='transaction_type',
            field=models.CharField(choices=[('Cash', 'Cash'), ('Bank', 'Bank'), ('Confirm', 'Confirm'), ('Other', 'Other')], max_length=20),
        ),
    ]
