# Generated by Django 4.0 on 2022-12-08 11:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0007_alter_appointment_home_alter_appointment_resident_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bath',
            name='resident',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='management.resident', verbose_name='Resident'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='bath',
            name='staff',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='mood',
            name='resident',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='management.resident', verbose_name='Resident'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='mood',
            name='staff',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff'),
            preserve_default=False,
        ),
    ]
