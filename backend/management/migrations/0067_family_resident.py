# Generated by Django 4.0 on 2023-02-25 20:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0066_family'),
    ]

    operations = [
        migrations.AddField(
            model_name='family',
            name='resident',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='management.resident'),
            preserve_default=False,
        ),
    ]