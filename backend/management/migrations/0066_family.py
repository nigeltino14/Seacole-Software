# Generated by Django 4.0 on 2023-02-25 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0065_alter_reminderrota_reminder'),
    ]

    operations = [
        migrations.CreateModel(
            name='Family',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=30)),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('phone', models.CharField(max_length=12, verbose_name='Contact')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('address', models.TextField()),
            ],
        ),
    ]
