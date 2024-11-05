# Generated by Django 4.0 on 2023-03-10 17:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0078_note_resident'),
    ]

    operations = [
        migrations.AddField(
            model_name='resident',
            name='NHS_number',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='note',
            name='resident',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.resident'),
        ),
    ]
