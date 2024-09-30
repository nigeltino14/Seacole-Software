# Generated by Django 4.0 on 2023-03-24 15:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0088_family_type_alter_attachments_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='handoverpayment',
            name='payment',
        ),
        migrations.AddField(
            model_name='handoverpayment',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='handoverpayment',
            name='resident',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='management.resident'),
            preserve_default=False,
        ),
    ]
