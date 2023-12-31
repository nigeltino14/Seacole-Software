# Generated by Django 4.0 on 2023-03-25 09:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0096_alter_evaluation_unique_together_evaluation_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reminderevaluationscheduler',
            name='evaluation_scheduler',
        ),
        migrations.AddField(
            model_name='reminderevaluationscheduler',
            name='evaluation',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='management.evaluation', verbose_name='Evaluation'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='reminderevaluationscheduler',
            name='reminder',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='Reminder', to='management.reminder', verbose_name='Reminder'),
        ),
        migrations.DeleteModel(
            name='EvaluationScheduler',
        ),
    ]
