# Generated by Django 4.0 on 2022-12-08 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0019_pressureareacare'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='food',
            name='amount',
        ),
        migrations.AddField(
            model_name='food',
            name='additional_info',
            field=models.TextField(default='', verbose_name='Additional Infomation'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='food',
            name='breakfast',
            field=models.TextField(default='', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='food',
            name='dinner',
            field=models.TextField(default='', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='food',
            name='emotion',
            field=models.CharField(choices=[('unknown', 'Unknown'), ('joyful', 'Joyful'), ('sad', 'Sad'), ('tearful', 'Tearful'), ('womed', 'Womed'), ('annoyed', 'Annoyed')], default='unknown', max_length=10, verbose_name='Emotion'),
        ),
        migrations.AddField(
            model_name='food',
            name='lunch',
            field=models.TextField(default='', max_length=20),
            preserve_default=False,
        ),
    ]
