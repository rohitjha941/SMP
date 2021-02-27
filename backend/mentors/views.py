import json

from django.db import transaction

from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from common.utils import verify_recaptcha

from .permissions import IsOwnerOrReadOnly
from .models import *
from .serializers import *

from common.models import Student, Branch
from common.serializers import StudentSerializer
# Create your views here.


class MentorListView(APIView):
    """
    Endpoint to return limited data on mentor
    """

    def get(self, request):
        return Response(MentorGETSerializer(Mentor.objects.all(), many=True).data, status=status.HTTP_200_OK)


class MentorView (APIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorPOSTSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly, ]
    """
    Endpoint for Mentor Registration Portal
    """
    # Note that there is no method for creating new profile, we do that here programatically

    def get(self, request, pk):
        """
        Method for requesting for data for prepopulation
        """
        try:
            mentor_application = MentorApplication.objects.get(user=pk)
        except:
            return Response({'msg': 'You have not applied', 'error': True}, status=status.HTTP_404_NOT_FOUND)

        if request.user != mentor_application.user:
            return Response({'status': 'You are not authorized', 'err': True}, status=status.HTTP_401_UNAUTHORIZED)
        if mentor_application.is_accepted:
            try:
                mentor_object = Mentor.objects.get(user=pk)
            except:
                mentor_object = Mentor()
                mentor_object.name = mentor_application.name
                mentor_object.user = mentor_application.user
                mentor_object.enrollno = mentor_application.enrollno
                mentor_object.resume = mentor_application.resume
                mentor_object.branch = mentor_application.branch
                mentor_object.year = mentor_application.year
                mentor_object.mobile = mentor_application.mobile
                mentor_object.email = mentor_application.email
                mentor_object.save()
            mentor_serializer = MentorPOSTSerializer(mentor_object)
            return Response({'user': mentor_serializer.data, 'err': False}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'Application Not Accepted', 'err': True}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        """
        Method to update existing profile
        """
        last_used_serializer = None
        try:
            # We will include serializer checks and raise Exception explicitly
            # if they fail. Using atomic transaction will cause complete rollback
            # avoiding inconsistent mentor data in case of query failure.
            try:
                mentor_application = MentorApplication.objects.get(user=pk)
            except:
                return Response({'msg': 'You have not applied', 'error': True}, status=status.HTTP_404_NOT_FOUND)

            with transaction.atomic():
                request_data = request.data
                if mentor_application.is_accepted:
                    try:
                        mentor_object = Mentor.objects.get(user=pk)
                    except:
                        mentor_object = Mentor()
                        mentor_object.name = mentor_application.name
                        mentor_object.user = mentor_application.user
                        mentor_object.enrollno = mentor_application.enrollno
                        mentor_object.resume = mentor_application.resume
                        mentor_object.branch = mentor_application.branch
                        mentor_object.year = mentor_application.year
                        mentor_object.mobile = mentor_application.mobile
                        mentor_object.email = mentor_application.email
                        mentor_object.save()

                    if request.user == mentor_object.user:
                        mentor_serializer = MentorPOSTSerializer(
                            mentor_object, data=request_data)
                        last_used_serializer = mentor_serializer
                        if mentor_serializer.is_valid():
                            mentor_serializer.save()

                            # delete previously existing data
                            MentorAchievement.objects.filter(
                                mentor=mentor_serializer.data.get('id')).delete()
                            MentorIntern.objects.filter(
                                mentor=mentor_serializer.data.get('id')).delete()
                            MentorPlacement.objects.filter(
                                mentor=mentor_serializer.data.get('id')).delete()

                            # add new data by mentor
                            if 'achievements' in request_data:
                                achievements = json.loads(
                                    request_data.get('achievements'))
                                for achievement in achievements:
                                    achievement_data = dict(
                                        mentor=mentor_serializer.data.get(
                                            'id'),
                                        achievement_name=achievement
                                    )
                                    achievement_serializer = MentorAchievementSerializer(
                                        data=achievement_data)
                                    last_used_serializer = achievement_serializer
                                    if achievement_serializer.is_valid():
                                        achievement_serializer.save()
                                    else:
                                        raise Exception

                            if 'interns' in request_data:
                                interns = json.loads(
                                    request_data.get('interns'))
                                for intern in interns:
                                    intern_data = dict(
                                        mentor=mentor_serializer.data.get(
                                            'id'),
                                        company=intern.get('company'),
                                        duration=intern.get('duration'),
                                        domain=intern.get('domain')
                                    )
                                    intern_serializer = MentorInternSerializer(
                                        data=intern_data)
                                    last_used_serializer = intern_serializer
                                    if intern_serializer.is_valid():
                                        intern_serializer.save()
                                    else:
                                        raise Exception
                            if 'placement' in request_data:
                                placement = json.loads(
                                    request_data.get('placement'))
                                placement_data = dict(
                                    mentor=mentor_serializer.data.get('id'),
                                    company=placement.get('company'),
                                    job_title=placement.get('job_title')
                                )
                                placement_serializer = MentorPlacementSerializer(
                                    data=placement_data)
                                last_used_serializer = placement_serializer
                                if placement_serializer.is_valid():
                                    placement_serializer.save()
                                else:
                                    raise Exception
                        else:
                            raise Exception
                    else:
                        return Response({'status': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
                else:
                    return Response({'status': 'Application Not Accepted', 'err': True}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(last_used_serializer.errors, status=status.HTTP_409_CONFLICT)
        return Response(mentor_serializer.data, status=status.HTTP_201_CREATED)


class InterestView (generics.ListCreateAPIView):
    queryset = Interest.objects.all().order_by('interest_name')
    serializer_class = InterestSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def create(self, request):
        interest_ids = []
        try:
            interests = request.data["interests"]
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        for interest in interests:
            instance, created = Interest.objects.get_or_create(
                interest_name=interest)
            interest_ids.append(instance.id)

        data = {
            'interest_ids': interest_ids
        }
        return Response(data, status=status.HTTP_201_CREATED)


class MentorApplicationView(APIView):
    """
    Endpoint for Mentor Application portal
    """
    queryset = MentorApplication.objects.all()
    serializer_class = MentorApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        if request.user.id == pk:
            student_exists = Student.objects.filter(
                user=request.user).count() > 0
            if student_exists:
                student_id = Student.objects.get(user=request.user).id
                has_applied = MentorApplication.objects.filter(
                    student=student_id).count() > 0
                if has_applied:
                    application_object = MentorApplication.objects.get(
                        student=student_id)
                    application_serializer = MentorApplicationSerializer(
                        application_object)
                    student_object = Student.objects.get(
                        id=application_serializer.data.get('student'))
                    student_serializer = StudentSerializer(student_object)
                    data = {**application_serializer.data,
                            **student_serializer.data}
                    return Response({'msg': 'Application Found', 'data': data}, status=status.HTTP_200_OK)
                else:
                    return Response({'msg': 'Application Not Found'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'msg': 'User not registered'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'msg': 'Invalid Credentials'}, status=status.HTTP_403_FORBIDDEN)

    def post(self, request):
        """
        Endpoint To Create new Application
        """
        # No two applications can be created for same user as there is one to one relationship between the two

        is_verified = verify_recaptcha(request)
        # is_verified = True
        if is_verified:
            with transaction.atomic():
                request_data = request.data
                student_exists = Student.objects.filter(
                    user=request.user).count() > 0
                if not student_exists:
                    try:
                        student_data = dict(
                            user=request.user.id,
                            name=request.user.first_name,
                            branch=request_data.get('branch'),
                            email=request.user.email,
                            enroll_no=request_data.get('enroll_no'),
                        )
                    except:
                        return Response({'msg': 'Insufficient Data'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
                    student_serializer = StudentSerializer(data=student_data)
                    if student_serializer.is_valid():
                        student_serializer.save()
                        student_id = student_serializer.data.get('id')
                    else:
                        return Response(student_serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
                else:
                    student_obj = Student.objects.get(user=request.user.id)
                    is_branch_valid = Branch.objects.filter(
                        pk=int(request_data.get('branch'))).count() > 0
                    if is_branch_valid:
                        branch = Branch.objects.get(
                            pk=int(request_data.get('branch')))
                    else:
                        return Response({'msg': 'Invalid branch name'}, status=status.HTTP_400_BAD_REQUEST)
                    student_obj.branch = branch
                    student_obj.save()
                    student_id = student_obj.id

                has_applied = MentorApplication.objects.filter(
                    student=student_id).count() > 0
                if has_applied:
                    return Response({'msg': 'Application Already Exists'}, status=status.HTTP_409_CONFLICT)
                try:
                    mentor_application_data = dict(
                        student=student_id,
                        is_accepted=False,
                        year=request_data.get('year'),
                        motivation=request_data.get('motivation'),
                        qualities=request_data.get('qualities'),
                        mobile=request_data.get('mobile'),
                        resume=request_data.get('resume'),
                    )
                except:
                    return Response({'msg': 'Insufficient Data'}, status=status.HTTP_406_NOT_ACCEPTABLE)
                mentor_application_serializer = MentorApplicationSerializer(
                    data=mentor_application_data)
                if mentor_application_serializer.is_valid():
                    mentor_application_serializer.save()
                    return Response({'msg': 'Application Successfully Submitted'}, status=status.HTTP_201_CREATED)
                else:
                    return Response(mentor_application_serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        return Response(data={'error': 'ReCAPTCHA not verified.'}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self, request, pk):
        """
        Endpoint to withdraw application
        """
        try:
            student_id = Student.objects.get(user=pk).id
            mentor_application = MentorApplication.objects.get(
                student=student_id)
            try:
                if request.user.id == pk:
                    mentor_application.delete()
                    return Response({'msg': 'Deleted Successfully!', 'err': False}, status=status.HTTP_200_OK)
                else:
                    return Response({'msg': 'You are not authorized!', 'err': True}, status=status.HTTP_401_UNAUTHORIZED)
            except:
                return Response({'msg': 'User credentials were not provided', 'err': True}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'msg': 'Mentor Application Was Not Found!', 'err': True}, status=status.HTTP_400_BAD_REQUEST)


class MentorInternView (generics.ListAPIView):
    serializer_class = MentorInternSerializer

    def get_queryset(self):
        ids = self.request.query_params.get('ids', None)
        queryset = MentorIntern.objects.all()
        if ids == '':
            queryset = MentorIntern.objects.none()
        elif ids is not None:
            ids_list = ids.split(",")
            queryset = MentorIntern.objects.filter(id__in=ids_list)

        return queryset


class MentorPlacementView (generics.ListAPIView):
    serializer_class = MentorPlacementSerializer

    def get_queryset(self):
        ids = self.request.query_params.get('ids', None)
        queryset = MentorPlacement.objects.all()
        if ids == '':
            queryset = MentorPlacement.objects.none()
        elif ids is not None:
            ids_list = ids.split(",")
            queryset = MentorPlacement.objects.filter(id__in=ids_list)

        return queryset


class MentorAchievementView (generics.ListAPIView):
    serializer_class = MentorAchievementSerializer

    def get_queryset(self):
        ids = self.request.query_params.get('ids', None)
        queryset = MentorAchievement.objects.all()
        if ids == '':
            queryset = MentorAchievement.objects.none()
        elif ids is not None:
            ids_list = ids.split(",")
            queryset = MentorAchievement.objects.filter(id__in=ids_list)

        return queryset
