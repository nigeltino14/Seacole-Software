# Generated by Django 4.0 on 2023-02-12 08:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0063_choice_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reminderevaluationscheduler',
            name='reminder',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='ReminderEvaluationScheduler', to='management.reminder', verbose_name='Reminder'),
        ),
    ]
