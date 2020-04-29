from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import *


class FresherDocumentView(APIView):
    def get(self, request):
        recent_upload = FresherDocument.objects.last()
        doc_serializer = FresherDocumentSerializer(recent_upload)
        return Response(doc_serializer.data, status=status.HTTP_200_OK)


class MentorDocumentView (generics.ListAPIView):
    queryset = MentorDocument.objects.all()
    serializer_class = MentorDocumentSerializer
