from rest_framework import serializers

from .models import *


class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = "__all__"


class HomeVisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeVision
        fields = "__all__"


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = "__all__"


class TeamPositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamPosition
        fields = "__all__"


class StudentTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentTeam
        fields = "__all__"


class ContactDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactDetails
        fields = "__all__"


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = "__all__"


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class RaisedQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = RaisedQuery
        fields = "__all__"


class CampusGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampusGroup
        fields = "__all__"
