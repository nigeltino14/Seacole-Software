# Generated by Django 5.0.4 on 2024-07-15 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0199_alter_supportplan_cp_duration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supportplan',
            name='cp_duration',
            field=models.CharField(blank=True, choices=[('Standard Care Plan', 'Standard Care Plan'), ('Short Term ', 'Short Term '), ('Long Term', 'Long Term')], max_length=40, null=True, verbose_name='Care Duration'),
        ),
    ]
