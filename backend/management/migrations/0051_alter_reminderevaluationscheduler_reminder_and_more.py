# Generated by Django 4.0 on 2023-02-03 12:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0050_alter_evaluationscheduler_evaluation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reminderevaluationscheduler',
            name='reminder',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ReminderEvaluationScheduler', to='management.reminder', unique=True, verbose_name='Reminder'),
        ),
        migrations.AlterField(
            model_name='reminderrota',
            name='reminder',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ReminderRota', to='management.reminder', unique=True, verbose_name='Reminder'),
        ),
        migrations.AlterUniqueTogether(
            name='reminderappointment',
            unique_together={('reminder', 'appointment')},
        ),
    ]