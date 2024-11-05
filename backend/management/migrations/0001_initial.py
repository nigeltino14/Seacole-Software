# Generated by Django 4.0 on 2022-12-01 11:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('training', models.TextField()),
                ('next_of_kin', models.TextField()),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=30)),
                ('is_archived', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('profile_pic', models.ImageField(blank=True, null=True, upload_to='profiles/')),
                ('phone', models.CharField(max_length=12, verbose_name='Contact')),
                ('address', models.TextField()),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Attachments',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('subject', models.CharField(blank=True, max_length=30, null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('description', models.TextField(blank=True, null=True)),
                ('category', models.CharField(choices=[('GeneralInfo', 'GeneralInfo'), ('CarePlan', 'CarePlane'), ('Medical', 'Medical'), ('Financial', 'Financial')], max_length=60)),
                ('attachment', models.FileField(upload_to='attachments')),
            ],
        ),
        migrations.CreateModel(
            name='Home',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=60)),
                ('address', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Resident',
            fields=[
                ('national_id', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=30)),
                ('date_of_birth', models.DateField()),
                ('is_archived', models.BooleanField(default=False)),
                ('is_discharged_status', models.BooleanField(default=False)),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('room', models.CharField(max_length=3)),
                ('profile_pic', models.ImageField(blank=True, null=True, upload_to='profiles/')),
                ('phone', models.CharField(max_length=12, verbose_name='Contact')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('address', models.TextField()),
                ('home', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.home')),
            ],
        ),
        migrations.CreateModel(
            name='Weight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('weight', models.FloatField(verbose_name='Weight')),
                ('resident', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.resident', verbose_name='Resident')),
                ('staff', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.user', verbose_name='Staff')),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('description', models.TextField()),
                ('status', models.CharField(choices=[('Done ', 'Done '), ('Pending ', 'Pending ')], max_length=30)),
                ('start', models.TimeField()),
                ('end_time', models.TimeField()),
                ('home', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.home')),
                ('staff', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.user', verbose_name='Staff')),
            ],
        ),
        migrations.CreateModel(
            name='SupportPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('status', models.CharField(choices=[('Done ', 'Done '), ('Pending ', 'Pending ')], max_length=30)),
                ('repeat', models.CharField(choices=[('daily', 'Daily'), ('weekly', 'Weekly'), ('monthly', 'Monthly'), ('yearly', 'Yearly')], max_length=7)),
                ('resident', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.resident', verbose_name='Resident')),
            ],
        ),
        migrations.CreateModel(
            name='SuggestionComplains',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.TextField()),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('location', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.home')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff')),
            ],
        ),
        migrations.CreateModel(
            name='Sleep',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('amount', models.FloatField(verbose_name='Hours Slept')),
                ('resident', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.resident', verbose_name='Resident')),
                ('staff', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.user', verbose_name='Staff')),
            ],
        ),
        migrations.CreateModel(
            name='ResidentDischarge',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('discharged_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff')),
                ('resident', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.resident')),
            ],
        ),
        migrations.CreateModel(
            name='Reminder',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('due_date', models.DateField()),
                ('next_evaluation_date', models.DateField()),
                ('end_evaluation_date', models.DateField()),
                ('subject', models.CharField(max_length=50)),
                ('notes', models.TextField()),
                ('status', models.BooleanField(choices=[('Done ', 'Done '), ('Pending ', 'Pending ')])),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('assigned_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff')),
            ],
        ),
        migrations.CreateModel(
            name='PettyCash',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('ammount', models.DecimalField(decimal_places=2, max_digits=20)),
                ('description', models.TextField()),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('attachment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.attachments')),
                ('resident', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.resident')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff')),
            ],
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('subject', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Created By')),
            ],
        ),
        migrations.CreateModel(
            name='Mood',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('state', models.CharField(choices=[('moody', 'moody'), ('cool', 'cool'), ('Other', 'Other')], max_length=10, verbose_name='Mood')),
                ('resident', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.resident', verbose_name='Resident')),
                ('staff', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.user', verbose_name='Staff')),
            ],
        ),
        migrations.CreateModel(
            name='MentalState',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('state', models.CharField(choices=[('moody', 'moody'), ('cool', 'cool'), ('Other', 'Other')], max_length=10, verbose_name='Mental state')),
                ('resident', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.resident', verbose_name='Resident')),
                ('staff', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.user', verbose_name='Staff')),
            ],
        ),
        migrations.CreateModel(
            name='FluidIntake',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('amount', models.FloatField(verbose_name='Fluid Intake')),
                ('resident', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.resident', verbose_name='Resident')),
                ('staff', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.user', verbose_name='Staff')),
            ],
        ),
        migrations.CreateModel(
            name='Finance',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('transaction_type', models.CharField(choices=[('Cash', 'Cash'), ('Bank', 'Bank'), ('Other', 'Other')], max_length=20)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=20)),
                ('state', models.CharField(choices=[('cr', 'cr'), ('dr', 'dr')], max_length=2, verbose_name='Type')),
                ('description', models.TextField()),
                ('staff_witnesses', models.CharField(default=[], max_length=255)),
                ('tag_number', models.CharField(max_length=255, verbose_name='Tag Number')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('resident', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.resident')),
                ('resident_signature', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.attachments')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff')),
            ],
        ),
        migrations.CreateModel(
            name='DailyCare',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('activity', models.CharField(choices=[('bath', 'bath')], max_length=20, null=True)),
                ('notes', models.TextField()),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('home', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.home')),
                ('resident', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.resident')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff')),
            ],
            options={
                'verbose_name_plural': 'Personale',
            },
        ),
        migrations.CreateModel(
            name='Bath',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='Created On')),
                ('type_of_bath', models.CharField(choices=[('full', 'full')], max_length=10, verbose_name='Bath Type')),
                ('resident', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.resident', verbose_name='Resident')),
                ('staff', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.user', verbose_name='Staff')),
            ],
        ),
        migrations.AddField(
            model_name='attachments',
            name='resident',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='management.resident'),
        ),
        migrations.AddField(
            model_name='attachments',
            name='staff',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.user', verbose_name='Staff'),
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('status', models.CharField(choices=[('Done ', 'Done '), ('Pending ', 'Pending ')], max_length=30)),
                ('home', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.home')),
                ('resident', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.resident', verbose_name='Resident')),
                ('staff', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.user', verbose_name='Staff')),
            ],
        ),
        migrations.CreateModel(
            name='Rota',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('shift', models.CharField(choices=[('Night', 'Night'), ('Day', 'Day'), ('Off', 'Off')], max_length=30)),
                ('assigned_residents', models.CharField(default=[], max_length=30)),
                ('date', models.DateField()),
                ('staff', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.user', verbose_name='Staff')),
            ],
            options={
                'unique_together': {('staff', 'date')},
            },
        ),
    ]
