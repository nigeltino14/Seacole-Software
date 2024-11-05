# Generated by Django 4.0 on 2022-12-09 18:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0024_remove_user_phone_user_nhs_number_user_ni_number_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('question', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='PosibleAnswear',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('answear', models.CharField(max_length=20)),
                ('score', models.DecimalField(decimal_places=2, max_digits=6)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.question')),
            ],
        ),
        migrations.CreateModel(
            name='Evaluation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now=True)),
                ('resident', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.resident')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user')),
            ],
        ),
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('evaluation', models.CharField(max_length=20, verbose_name='Evaluation')),
                ('score', models.DecimalField(decimal_places=2, max_digits=6)),
                ('answer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.posibleanswear')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.question')),
            ],
        ),
        migrations.CreateModel(
            name='Assessment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=20)),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user')),
            ],
        ),
    ]
