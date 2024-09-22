# Generated by Django 4.0 on 2022-12-19 13:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0025_question_posibleanswear_evaluation_choice_assessment'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAssigned',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('activity', models.CharField(choices=[('bath', 'bath')], max_length=20, null=True)),
                ('notes', models.TextField()),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('home', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='management.home')),
                ('resident', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.resident')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff')),
            ],
            options={
                'verbose_name_plural': 'Personale',
            },
        ),
    ]
