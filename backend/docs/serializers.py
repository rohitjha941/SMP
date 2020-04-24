from rest_framework import serializers

from .models import *


class FresherDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FresherDocument
        fields = "__all__"


class MentorDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorDocument
        fields = "__all__"
