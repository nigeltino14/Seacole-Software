# Generated by Django 4.0 on 2023-09-13 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0144_user_home'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='category',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]