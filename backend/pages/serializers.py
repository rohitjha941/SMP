from .models import *
from rest_framework import serializers

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

class MentorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mentor
        fields = "__all__"

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = "__all__"


class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = "__all__"
class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = "__all__"
class MentorDocsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorDocs
        fields = "__all__"

class RaisedQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = RaisedQuery
        fields = "__all__"