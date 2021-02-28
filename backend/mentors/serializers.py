from rest_framework import serializers
from .models import *
from common.serializers import StudentSerializer


class MentorGETSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)

    class Meta:
        model = Mentor
        fields = ['id', 'student', 'year', 'photo', 'interest', 'groups', 'facebook', 'linkedin', 'resume', 'mentor_intern',
                  'mentor_placement', 'mentor_achievement']


class MentorPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mentor
        fields = ['id', 'year', 'photo', 'interest', 'groups', 'facebook', 'linkedin', 'resume', 'career', 'mobile',
                  'mentor_intern', 'mentor_placement', 'mentor_achievement']


class MentorAchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorAchievement
        fields = "__all__"


class MentorInternSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorIntern
        fields = "__all__"


class MentorPlacementSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorPlacement
        fields = "__all__"


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = "__all__"


class MentorApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorApplication
        fields = "__all__"
