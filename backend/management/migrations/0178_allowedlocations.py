# Generated by Django 4.0 on 2023-10-31 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0177_note_deletion_reason_note_is_deleted'),
    ]

    operations = [
        migrations.CreateModel(
            name='AllowedLocations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('radius', models.FloatField()),
            ],
        ),
    ]