# Generated by Django 4.0 on 2023-04-21 07:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0113_rename_bodymaps_bodymap'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bodymap',
            old_name='length',
            new_name='wound_depth',
        ),
        migrations.RenameField(
            model_name='bodymap',
            old_name='width',
            new_name='wound_lenght',
        ),
        migrations.AddField(
            model_name='bodymap',
            name='wound_width',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
