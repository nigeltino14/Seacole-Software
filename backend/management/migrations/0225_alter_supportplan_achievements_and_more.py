# Generated by Django 5.0.4 on 2025-02-08 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0224_alter_supportplan_achievements_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supportplan',
            name='achievements',
            field=models.CharField(blank=True, max_length=9999, null=True),
        ),
        migrations.AlterField(
            model_name='supportplan',
            name='action_plan',
            field=models.CharField(blank=True, max_length=9999, null=True),
        ),
        migrations.AlterField(
            model_name='supportplan',
            name='evaluations',
            field=models.CharField(blank=True, max_length=9999, null=True),
        ),
        migrations.AlterField(
            model_name='supportplan',
            name='goal',
            field=models.CharField(blank=True, max_length=9999, null=True),
        ),
        migrations.AlterField(
            model_name='supportplan',
            name='issue',
            field=models.CharField(blank=True, max_length=9999, null=True),
        ),
    ]
