# Generated by Django 4.0 on 2023-01-29 18:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0048_alter_rota_assigned_home'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='evaluationscheduler',
            name='reminder',
        ),
        migrations.CreateModel(
            name='ReminderEvaluationScheduler',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('evaluation_scheduler', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.evaluationscheduler', verbose_name='EvaluationReminderScheduler')),
                ('reminder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ReminderEvaluationScheduler', to='management.reminder', verbose_name='Reminder')),
            ],
        ),
    ]
