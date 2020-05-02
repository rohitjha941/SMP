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


class faqSerializer(serializers.ModelSerializer):
    class Meta:
        model = faq
        fields = "__all__"


class StudentTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentTeam
        fields = "__all__"


class branchSerializer(serializers.ModelSerializer):
    class Meta:
        model = branch
        fields = "__all__"


class ContactDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactDetails
        fields = "__all__"


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = "__all__"


class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = "__all__"


class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = "__all__"


class RaisedQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = RaisedQuery
        fields = "__all__"


class CampusGroupsSerializer(serializers.ModelSerializer):

    class Meta:
        model = CampusGroups
        fields = "__all__"
