# Generated by Django 4.0 on 2023-02-27 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0072_alter_suggestioncomplains_subject'),
    ]

    operations = [
        migrations.AddField(
            model_name='sleep',
            name='additional_info',
            field=models.TextField(default='', verbose_name='Additional Infomation'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sleep',
            name='emotion',
            field=models.CharField(choices=[('unknown', 'Unknown'), ('joyful', 'Joyful'), ('sad', 'Sad'), ('tearful', 'Tearful'), ('womed', 'Womed'), ('annoyed', 'Annoyed')], default='unknown', max_length=10, verbose_name='Emotion'),
        ),
        migrations.AddField(
            model_name='weight',
            name='additional_info',
            field=models.TextField(default='', verbose_name='Additional Infomation'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='weight',
            name='emotion',
            field=models.CharField(choices=[('unknown', 'Unknown'), ('joyful', 'Joyful'), ('sad', 'Sad'), ('tearful', 'Tearful'), ('womed', 'Womed'), ('annoyed', 'Annoyed')], default='unknown', max_length=10, verbose_name='Emotion'),
        ),
    ]