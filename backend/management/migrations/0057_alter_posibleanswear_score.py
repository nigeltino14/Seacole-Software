# Generated by Django 4.0 on 2023-02-08 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0056_alter_evaluation_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posibleanswear',
            name='score',
            field=models.IntegerField(),
        ),
    ]
