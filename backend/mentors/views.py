import json

from django.db import transaction

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import *
from .serializers import *


# Create your views here.
class MentorView (APIView):
    def get(self, request):
        return Response(MentorSerializer(Mentor.objects.all(), many=True).data, status=status.HTTP_200_OK)

    def post(self, request):
        last_used_serializer = None
        try:
            # We will include serializer checks and raise Exception explicitly
            # if they fail. Using atomic transaction will cause complete rollback
            # avoiding inconsistent mentor data in case of query failure.
            with transaction.atomic():
                request_data = request.data
                mentor_serializer = MentorSerializer(data=request_data)
                last_used_serializer = mentor_serializer
                if mentor_serializer.is_valid():
                    mentor_serializer.save()
                    if 'achievements' in request_data:
                        achievements = json.loads(
                            request_data.get('achievements'))
                        for achievement in achievements:
                            achievement_data = dict(
                                mentor=mentor_serializer.data.get('id'),
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
                                mentor=mentor_serializer.data.get('id'),
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
                        placement = json.loads(request_data.get('placement'))
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
        except Exception:
            return Response(last_used_serializer.errors, status=status.HTTP_409_CONFLICT)
        return Response(mentor_serializer.data, status=status.HTTP_201_CREATED)


class InterestView (generics.ListCreateAPIView):
    queryset = Interest.objects.all().order_by('interest_name')
    serializer_class = InterestSerializer

    def create(self, request):
        interests = []
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
