# Generated by Django 4.0 on 2023-11-15 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0185_alter_supportplan_created_on'),
    ]

    operations = [
        migrations.AlterField(
            model_name='riskactionplan',
            name='created_on',
            field=models.DateField(auto_now_add=True, verbose_name='Created On'),
        ),
    ]