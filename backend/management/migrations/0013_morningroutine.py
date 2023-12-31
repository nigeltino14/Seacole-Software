# Generated by Django 4.0 on 2022-12-08 19:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0012_fluidintake_emotion_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='MorningRoutine',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('washing', models.TextField(max_length=20)),
                ('shaving', models.TextField(max_length=20)),
                ('prompting', models.TextField(max_length=20)),
                ('oral_care', models.TextField(max_length=20)),
                ('toilet_use', models.TextField(max_length=20)),
                ('get_up', models.TextField(max_length=20)),
                ('getting_dressed', models.TextField(max_length=20)),
                ('emotion', models.CharField(choices=[('unknown', 'Unknown'), ('joyful', 'Joyful'), ('sad', 'Sad'), ('tearful', 'Tearful'), ('womed', 'Womed'), ('annoyed', 'Annoyed')], default='unknown', max_length=10, verbose_name='Emotion')),
                ('additional_info', models.TextField(verbose_name='Additional Infomation')),
                ('resident', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.resident', verbose_name='Resident')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff')),
            ],
        ),
    ]
