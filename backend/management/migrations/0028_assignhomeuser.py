# Generated by Django 4.0 on 2022-12-19 18:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0027_question_assement'),
    ]

    operations = [
        migrations.CreateModel(
            name='AssignHomeUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('home', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='management.home')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff')),
            ],
        ),
    ]