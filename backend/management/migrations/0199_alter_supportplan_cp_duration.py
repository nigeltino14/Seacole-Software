# Generated by Django 5.0.4 on 2024-07-15 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0198_supportplan_staff_alter_riskactionplan_discontinue'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supportplan',
            name='cp_duration',
            field=models.CharField(blank=True, choices=[('Standard Care Plan', 'Standard Care Plan'), ('Sort Term ', 'Short Term '), ('Long Term', 'Long Term')], max_length=30, null=True, verbose_name='Care Duration'),
        ),
    ]
