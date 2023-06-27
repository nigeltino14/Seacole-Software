from rest_framework import generics, authentication, permissions, viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ViewSet
from rest_framework.parsers import JSONParser
from django.contrib.auth.models import Permission, Group

# API view for django.contrib.auth.models.User


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""

    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    """Create a nerw auth token"""

    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """

    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(
                serializer.data.get("old_password")
            ):
                return Response(
                    {"old_password": ["Wrong password."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                "status": "success",
                "code": status.HTTP_200_OK,
                "message": "Password updated successfully",
                "data": [],
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""

    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """Retrieve and return the authenticated user"""
        return self.request.user


class ReminderViewSet(viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def get_queryset(self):
        user = self.request.user
        if self.request.user.is_staff:
            queryset = Reminder.objects.all()
        else:
            queryset = Reminder.objects.filter(staff=user)
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class StaffViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.DjangoModelPermissions]


class PermissionsViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionnsSerializer
    permission_classes = [permissions.DjangoModelPermissions]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.DjangoModelPermissions]


class ResidentDischargeViewSet(viewsets.ModelViewSet):
    queryset = ResidentDischarge.objects.all()
    serializer_class = ResidentDischargeSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class DailyCareViewSet(viewsets.ModelViewSet):
    queryset = DailyCare.objects.all()
    serializer_class = DailyCareSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def get_queryset(self):
        user = self.request.user
        if self.request.user.is_staff:
            queryset = DailyCare.objects.all()
        else:
            queryset = DailyCare.objects.filter(staff=user)
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class AttachmentsViewSet(viewsets.ModelViewSet):
    serializer_class = AttachmentsSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.DjangoModelPermissions]

    def get_queryset(self):
        queryset = Attachments.objects.all()
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)



class BodyMapViewSet(viewsets.ModelViewSet):
    serializer_class = BodyMapSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.DjangoModelPermissions]

    def get_queryset(self):
        queryset = BodyMap.objects.all()
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class ResidentViewSet(viewsets.ModelViewSet):
    queryset = Resident.objects.all()
    serializer_class = ResidentSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

class PettyCashViewSet(viewsets.ModelViewSet):
    queryset = PettyCash.objects.all()
    serializer_class = PettyCashSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def get_queryset(self):
        user = self.request.user
        if self.request.user.is_staff:
            queryset = PettyCash.objects.all()
        else:
            queryset = PettyCash.objects.filter(staff=user)
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class FinanceViewSet(viewsets.ModelViewSet):
    queryset = Finance.objects.all()
    serializer_class = FinanceSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def get_queryset(self):
        queryset = Finance.objects.all()

        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class SuggestionComplainsViewSet(viewsets.ModelViewSet):
    queryset = SuggestionComplains.objects.all()
    serializer_class = SuggestionComplainsSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class RotaViewSet(viewsets.ModelViewSet):
    queryset = Rota.objects.all()
    serializer_class = RotaSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def get_queryset(self):
        user = self.request.user
        if self.request.user.is_staff:
            queryset = Rota.objects.all()
        else:
            queryset = Rota.objects.filter(staff=user)
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class SupportPlanViewSet(viewsets.ModelViewSet):
    queryset = SupportPlan.objects.all()
    serializer_class = SupportPlanSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def get_queryset(self):
        user = self.request.user
        if self.request.user.is_staff:
            queryset = Task.objects.all()
        else:
            queryset = Task.objects.filter(staff=user)
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class HomeViewSet(viewsets.ModelViewSet):
    serializer_class = HomeSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Home.objects.all()
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def get_queryset(self):
        queryset = Note.objects.all()
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class WeightViewSet(viewsets.ModelViewSet):
    queryset = Weight.objects.all()
    serializer_class = WeightSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class FluidIntakeViewSet(viewsets.ModelViewSet):
    queryset = FluidIntake.objects.all()
    serializer_class = FluidIntakeSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class SleepViewSet(viewsets.ModelViewSet):
    queryset = Sleep.objects.all()
    serializer_class = SleepSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class MentalStateViewSet(viewsets.ModelViewSet):
    queryset = MentalState.objects.all()
    serializer_class = MentalStateSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class MoodViewSet(viewsets.ModelViewSet):
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class BathViewSet(viewsets.ModelViewSet):
    queryset = Bath.objects.all()
    serializer_class = BathSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class MorningRoutineViewSet(viewsets.ModelViewSet):
    queryset = MorningRoutine.objects.all()
    serializer_class = MorningRoutineSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class AfternoonRoutineViewSet(viewsets.ModelViewSet):
    queryset = AfternoonRoutine.objects.all()
    serializer_class = AfternoonRoutineSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class EvaluationViewSet(viewsets.ModelViewSet):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class PosibleAnswearViewSet(viewsets.ModelViewSet):
    queryset = PosibleAnswear.objects.all()
    serializer_class = PosibleAnswearSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class AssignHomeUserViewset(viewsets.ModelViewSet):
    queryset = AssignHomeUser.objects.all()
    serializer_class = AssignHomeUser
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class SupportPlanViewset(viewsets.ModelViewSet):
    queryset = SupportPlan.objects.all()
    serializer_class = SupportPlanSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class RiskActionPlanViewset(viewsets.ModelViewSet):
    queryset = RiskActionPlan.objects.all()
    serializer_class = RiskActionPlanSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class RiskSchedulerViewset(viewsets.ModelViewSet):
    queryset = RiskScheduler.objects.all()
    serializer_class = RiskSchedulerSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)



class PlanSchedulerViewset(viewsets.ModelViewSet):
    queryset = SupportScheduler.objects.all()
    serializer_class = SupportPlanSchedulerSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)



class AccidentSchedulerViewset(viewsets.ModelViewSet):
    queryset = SuggestionComplainsScheduler.objects.all()
    serializer_class = AccidentPlanSchedulerSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)



class EvaluationSchedulerViewset(viewsets.ModelViewSet):
    queryset = ReminderEvaluationScheduler.objects.all()
    serializer_class = EvaluationPlanSchedulerSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)


class Choices(viewsets.ViewSet):
    def list(self, request):
        data = JSONParser().parse(request)
        answer = PosibleAnswear.objects.get(id=data["answer"])
        comment = data["comment"]
        evaluation = Evaluation.objects.get(id=data["evaluation"])
        question = Question.objects.get(id=data["question"])
        try:
            choice = Choice.objects.get(
                comment=comment, question=question, evaluation=evaluation
            )
            choice.answer = answer
            choice.save()
        except Exception as e:
            Choice.objects.create(
                comment=comment,
                evaluation=evaluation,
                question=question,
                answer=answer,
            )
        queryset = Choice.objects.all()
        serializer = ChoiceSerializer(queryset, many=True)
        return Response(serializer.data)


class NextofKeenViewSet(viewsets.ViewSet):
    def list(self, request):
        data = JSONParser().parse(request)
        family = Family.objects.get(id=data["family"])
        resident = Resident.objects.get(national_id=data["resident"])
        try:
            nxtkin = NextofKeen.objects.get(resident=resident)
            nxtkin.family = family
            nxtkin.save()
        except Exception as e:
            NextofKeen.objects.create(
                family=family,
                resident=resident,
            )
        queryset = NextofKeen.objects.all()
        serializer = NextofKeenSerializer(queryset, many=True)
        return Response(serializer.data)


class HandoverPaymentViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = HandoverPayment.objects.all()
        serializer = HandoverPaymentSerializer(queryset, many=True)
        return Response(serializer.data)

    def update(self, request):
        data = JSONParser().parse(request)
        email = data["email"]
        password = data["password"]
        amount = data["amount"]
        resident = data["resident"]
        resident = Resident.objects.get(national_id=resident)
        user = authenticate(request, username=email, password=password)
        if user is not None:
            if user != request.user:
                HandoverPayment.objects.create(
                    incoming=user,
                    outgoing=request.user,
                    resident=resident,
                    amount=amount,
                )
        queryset = HandoverPayment.objects.all()
        serializer = HandoverPaymentSerializer(queryset, many=True)
        return Response(serializer.data)
