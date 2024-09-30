# Generated by Django 4.0 on 2023-09-15 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0148_alter_houseassets_location'),
    ]

    operations = [
        migrations.CreateModel(
            name='HouseStock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255)),
                ('quantity', models.IntegerField()),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'ordering': ['-name'],
            },
        ),
    ]
