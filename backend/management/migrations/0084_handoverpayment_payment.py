# Generated by Django 4.0 on 2023-03-17 17:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0083_alter_user_training'),
    ]

    operations = [
        migrations.AddField(
            model_name='handoverpayment',
            name='payment',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='management.finance'),
        ),
    ]
