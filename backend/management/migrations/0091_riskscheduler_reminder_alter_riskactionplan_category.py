# Generated by Django 4.0 on 2023-03-25 06:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0090_supportscheduler_riskscheduler'),
    ]

    operations = [
        migrations.AddField(
            model_name='riskscheduler',
            name='reminder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ReminderRiskScheduler', to='management.reminder', verbose_name='Reminder'),
        ),
        migrations.AlterField(
            model_name='riskactionplan',
            name='category',
            field=models.CharField(choices=[('HousingTenancy', 'Housing/Tenancy'), ('Risk', 'Risk'), ('FinanceMoneyBenefitManagement', 'Finance/Money/Benefit Management'), ('RentArrearsServiceUsers', 'Rent Arrears - Service Users'), ('RentArrearsServiceUsers', 'Rent Arrears - Service Users'), ('Education', 'Education'), ('Training', 'Training'), ('Employment', 'Employment'), ('MentalHealthSubstanceUse', 'Mental Health/Substance Use'), ('EthnicCulturalReligiousNeeds', 'Ethnic/Cultural/Religious Needs -'), ('LeisureSocialNetwork', 'LeisureSocialNetwork'), ('MovingOn', 'Moving On'), ('FurtherConcernsNeeds', 'Further Concerns/Needs -'), ('ServicesprovidedbyHousingorEstateManagementService', 'Services provided by Housing or Estate Management Service'), ('ServicesprovidedbySupportWorker', 'Services provided by Support Worker'), ('SupportWorkersViewsofIssuesNeedsorActions', "Support Worker's Views of Issues, Needs or Actions")], default='Risk', max_length=100),
        ),
    ]
