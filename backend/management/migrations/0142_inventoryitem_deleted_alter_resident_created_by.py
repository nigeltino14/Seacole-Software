# Generated by Django 4.0 on 2023-08-29 06:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0141_resident_created_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventoryitem',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='resident',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='management.user'),
        ),
    ]
