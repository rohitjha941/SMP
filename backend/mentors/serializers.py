from rest_framework import serializers
from .models import *


class MentorGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mentor
        fields = ['id', 'name', 'branch', 'year', 'photo', 'interest', 'groups', 'facebook', 'linkedin', 'resume',
                  'mentor_intern', 'mentor_placement', 'mentor_achievement']


class MentorPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mentor
        fields = ['id', 'name', 'branch', 'year', 'photo', 'interest', 'groups', 'facebook', 'linkedin', 'resume',
                  'email', 'career', 'mobile', 'enrollno', 'mentor_intern', 'mentor_placement', 'mentor_achievement']


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
        fields = ['id', 'name', 'email', 'enrollno', 'branch', 'user',
                  'year', 'qualities', 'motivation', 'mobile', 'resume']
