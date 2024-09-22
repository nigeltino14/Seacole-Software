# Generated by Django 4.0 on 2023-10-01 13:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0161_repairrecord_is_deleted'),
    ]

    operations = [
        migrations.CreateModel(
            name='DeletionRecords',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_deleted', models.DateTimeField()),
                ('deleted_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.user')),
            ],
        ),
    ]
