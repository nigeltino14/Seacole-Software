# Generated by Django 4.0 on 2023-01-29 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0046_alter_rota_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rota',
            name='end_date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='rota',
            name='start_date',
            field=models.DateTimeField(),
        ),
    ]