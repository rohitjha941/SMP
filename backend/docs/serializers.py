from rest_framework import serializers

from .models import *


class FresherDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FresherDocument
        fields = "__all__"
