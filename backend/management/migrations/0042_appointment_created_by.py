# Generated by Django 4.0 on 2023-01-29 15:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0041_appointment_title_reminderrota_rota_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='created_by',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='appointment_created_by', to='management.user', verbose_name='Staff'),
            preserve_default=False,
        ),
    ]