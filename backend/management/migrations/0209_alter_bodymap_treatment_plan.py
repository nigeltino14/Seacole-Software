# Generated by Django 5.0.4 on 2024-07-26 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0208_supportplan_deletion_reason_supportplan_is_deleted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bodymap',
            name='treatment_plan',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
