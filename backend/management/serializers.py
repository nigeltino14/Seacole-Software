from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import Permission, Group

from .models import *
from django.contrib.auth import (
    get_user_model,
    authenticate,
)


class PermissionnsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = "__all__"


class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionnsSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object"""

    groups = GroupSerializer(many=True, read_only=True)
    user_permissions = PermissionnsSerializer(many=True, read_only=True)

    def create(self, validated_data):
        group_id = self.initial_data.pop("groups")
        user = User.objects.create(**validated_data)
        if group_id[0]:
            gr = Group.objects.get(id=int(group_id[0]))
            user.groups.add(gr)
        return user

    def update(self, instance, validated_data):
        group_id = self.initial_data.pop("groups")
        if group_id[0]:
            gr = Group.objects.get(id=int(group_id[0]))
            instance.groups.add(gr)
        return instance

    class Meta:
        model = get_user_model()
        exclude = ["password", "leave_date", "start_date", "last_login"]


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user auth token"""

    email = serializers.EmailField()
    password = serializers.CharField(
        style={"input_type": "password"},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get("email")
        password = attrs.get("password")
        user = authenticate(
            request=self.context.get("request"),
            username=email,
            password=password,
        )
        if not user:
            msg = _("Unable to authenticate with provided credentials")
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = "__all__"


class ResidentDischargeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResidentDischarge
        fields = "__all__"


class DailyCareSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyCare
        fields = "__all__"


class AttachmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachments
        fields = "__all__"



class BodyMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = BodyMap
        fields = "__all__"


class HandoverPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HandoverPayment
        fields = "__all__"


class ResidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resident
        fields = "__all__"


class PettyCashSerializer(serializers.ModelSerializer):
    class Meta:
        model = PettyCash
        fields = "__all__"


class FinanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Finance
        fields = "__all__"


class SuggestionComplainsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuggestionComplains
        fields = "__all__"


class RotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rota
        fields = "__all__"


class SupportPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportPlan
        fields = "__all__"


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = "__all__"


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"


class WeightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weight
        fields = "__all__"


class FluidIntakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FluidIntake
        fields = "__all__"


class SleepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sleep
        fields = "__all__"


class MentalStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentalState
        fields = "__all__"


class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mood
        fields = "__all__"


class BathSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bath
        fields = "__all__"


class MorningRoutineSerializer(serializers.ModelSerializer):
    class Meta:
        model = MorningRoutine
        fields = "__all__"


class AfternoonRoutineSerializer(serializers.ModelSerializer):
    class Meta:
        model = AfternoonRoutine
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = "__all__"


class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluation
        fields = "__all__"


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = "__all__"


class PosibleAnswearSerializer(serializers.ModelSerializer):
    class Meta:
        model = PosibleAnswear
        fields = "__all__"


class AssignHomeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignHomeUser
        fields = "__all__"


class SupportPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportPlan
        fields = "__all__"


class RiskActionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskActionPlan
        fields = "__all__"

class RiskSchedulerSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskScheduler
        fields = "__all__"

class SupportPlanSchedulerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportScheduler
        fields = "__all__"

class AccidentPlanSchedulerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuggestionComplainsScheduler
        fields = "__all__"

class EvaluationPlanSchedulerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReminderEvaluationScheduler
        fields = "__all__"
