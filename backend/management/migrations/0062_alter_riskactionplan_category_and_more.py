# Generated by Django 4.0 on 2023-02-11 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0061_alter_riskactionplan_yes_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='riskactionplan',
            name='category',
            field=models.CharField(choices=[('HousingTenancy', 'Housing/Tenancy'), ('Risk', 'Risk'), ('FinanceMoneyBenefitManagement', 'Finance/Money/Benefit Management'), ('RentArrearsServiceUsers', 'Rent Arrears - Service Users'), ('RentArrearsServiceUsers', 'Rent Arrears - Service Users'), ('Education', 'Education'), ('Training', 'Training'), ('Employment', 'Employment'), ('MentalHealthSubstanceUse', 'Mental Health/Substance Use'), ('EthnicCulturalReligiousNeeds', 'Ethnic/Cultural/Religious Needs -'), ('LeisureSocialNetwork', 'LeisureSocialNetwork'), ('MovingOn', 'Moving On'), ('FurtherConcernsNeeds', 'Further Concerns/Needs -'), ('ServicesprovidedbyHousingorEstateManagementService', 'Services provided by Housing or Estate Management Service'), ('ServicesprovidedbySupportWorker', 'Services provided by Support Worker'), ('SupportWorkersViewsofIssuesNeedsorActions', "Support Worker's Views of Issues, Needs or Actions")], max_length=100),
        ),
        migrations.AlterField(
            model_name='supportplan',
            name='category',
            field=models.CharField(choices=[('HousingTenancy', 'Housing/Tenancy'), ('Risk', 'Risk'), ('FinanceMoneyBenefitManagement', 'Finance/Money/Benefit Management'), ('RentArrearsServiceUsers', 'Rent Arrears - Service Users'), ('RentArrearsServiceUsers', 'Rent Arrears - Service Users'), ('Education', 'Education'), ('Training', 'Training'), ('Employment', 'Employment'), ('MentalHealthSubstanceUse', 'Mental Health/Substance Use'), ('EthnicCulturalReligiousNeeds', 'Ethnic/Cultural/Religious Needs -'), ('LeisureSocialNetwork', 'LeisureSocialNetwork'), ('MovingOn', 'Moving On'), ('FurtherConcernsNeeds', 'Further Concerns/Needs -'), ('ServicesprovidedbyHousingorEstateManagementService', 'Services provided by Housing or Estate Management Service'), ('ServicesprovidedbySupportWorker', 'Services provided by Support Worker'), ('SupportWorkersViewsofIssuesNeedsorActions', "Support Worker's Views of Issues, Needs or Actions")], max_length=100),
        ),
    ]
