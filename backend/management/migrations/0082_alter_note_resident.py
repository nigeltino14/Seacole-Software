# Generated by Django 4.0 on 2023-03-10 17:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0081_merge_20230310_1751'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='resident',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.resident'),
        ),
    ]