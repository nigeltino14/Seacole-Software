# Generated by Django 4.0 on 2022-12-08 20:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0017_activity'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mood',
            name='state',
        ),
        migrations.AddField(
            model_name='mood',
            name='additional_info',
            field=models.TextField(default='', verbose_name='Additional Infomation'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='mood',
            name='emotion',
            field=models.CharField(choices=[('unknown', 'Unknown'), ('joyful', 'Joyful'), ('sad', 'Sad'), ('tearful', 'Tearful'), ('womed', 'Womed'), ('annoyed', 'Annoyed')], default='unknown', max_length=10, verbose_name='Emotion'),
        ),
    ]