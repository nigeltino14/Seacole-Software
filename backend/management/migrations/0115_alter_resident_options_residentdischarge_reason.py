# Generated by Django 4.0 on 2023-04-24 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0114_rename_length_bodymap_wound_depth_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='resident',
            options={'ordering': ['-is_archived']},
        ),
        migrations.AddField(
            model_name='residentdischarge',
            name='reason',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
