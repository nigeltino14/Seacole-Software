# Generated by Django 5.0.4 on 2024-09-05 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0217_atriskoption_remove_riskactionplan_at_risk_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='atriskoption',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
