# Generated by Django 4.0 on 2023-03-25 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0103_rota_recur'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rota',
            name='end_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='rota',
            name='start_date',
            field=models.DateField(),
        ),
    ]
