# Generated by Django 4.0 on 2022-12-08 14:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0008_alter_bath_resident_alter_bath_staff_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('amount', models.FloatField(verbose_name='Amount Eaten')),
                ('resident', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.resident', verbose_name='Resident')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff')),
            ],
        ),
    ]
