# Generated by Django 4.0 on 2022-12-08 21:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0020_remove_food_amount_food_additional_info_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Medication',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('type_of_medication', models.TextField(max_length=20)),
                ('was_medication_taken', models.TextField(max_length=20)),
                ('time_administered', models.DateTimeField()),
                ('emotion', models.CharField(choices=[('unknown', 'Unknown'), ('joyful', 'Joyful'), ('sad', 'Sad'), ('tearful', 'Tearful'), ('womed', 'Womed'), ('annoyed', 'Annoyed')], default='unknown', max_length=10, verbose_name='Emotion')),
                ('additional_info', models.TextField(verbose_name='Additional Infomation')),
                ('resident', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.resident', verbose_name='Resident')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff')),
            ],
        ),
    ]