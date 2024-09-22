# Generated by Django 4.0 on 2023-10-09 07:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0173_rename_description_note_entry'),
    ]

    operations = [
        migrations.CreateModel(
            name='ConfidentialRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('information', models.TextField()),
                ('added_on', models.DateField(auto_now_add=True)),
                ('attachment', models.FileField(blank=True, null=True, upload_to='confidential-info/')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.user')),
                ('resident', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.resident')),
            ],
        ),
    ]
