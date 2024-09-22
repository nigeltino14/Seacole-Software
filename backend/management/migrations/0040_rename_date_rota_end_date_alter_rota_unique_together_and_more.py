# Generated by Django 4.0 on 2023-01-29 14:42

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0039_reminder_created_by'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rota',
            old_name='date',
            new_name='end_date',
        ),
        migrations.AlterUniqueTogether(
            name='rota',
            unique_together=set(),
        ),
        migrations.AddField(
            model_name='rota',
            name='assigned_home',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='RotaHome', to='management.user', verbose_name='Home'),
        ),
        migrations.AddField(
            model_name='rota',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Created On'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='rota',
            name='start_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='rota',
            name='staff',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='RotaStaff', to='management.user', verbose_name='Staff'),
        ),
        migrations.AlterUniqueTogether(
            name='rota',
            unique_together={('staff', 'start_date', 'assigned_home')},
        ),
        migrations.CreateModel(
            name='ReminderRota',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rr_created_by', to='management.user', verbose_name='Staff')),
                ('reminder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Rota')),
            ],
        ),
        migrations.CreateModel(
            name='ReminderEvaluation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='re_created_by', to='management.user', verbose_name='Staff')),
                ('reminder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ReminderEvaluation', to='management.user', verbose_name='Reminder')),
                ('valuation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Evaluation')),
            ],
        ),
        migrations.CreateModel(
            name='ReminderAppointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('appointment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Appointment')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ra_created_by', to='management.user', verbose_name='Staff')),
                ('reminder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ReminderAppointment', to='management.user', verbose_name='Appointment')),
            ],
        ),
    ]
