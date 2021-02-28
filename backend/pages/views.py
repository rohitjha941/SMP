import datetime

from rest_framework import generics, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from common.utils import verify_recaptcha

from .models import *
from .serializers import *

from mail.utils import mail_raised_query


class HomeView(generics.ListAPIView):
    queryset = Home.objects.all()
    serializer_class = HomeSerializer


class HomeVisionView(generics.ListAPIView):
    queryset = HomeVision.objects.all()
    serializer_class = HomeVisionSerializer


class FaqView(generics.ListAPIView):
    queryset = Faq.objects.all()
    serializer_class = FaqSerializer


class TeamPositionView (generics.ListAPIView):
    queryset = TeamPosition.objects.all()
    serializer_class = TeamPositionSerializer


class StudentTeamView (generics.ListAPIView):
    queryset = StudentTeam.objects.all()
    serializer_class = StudentTeamSerializer


class ContactDetailsView(generics.ListAPIView):
    queryset = ContactDetails.objects.all()
    serializer_class = ContactDetailsSerializer


class CampusGroupView (generics.ListAPIView):
    queryset = CampusGroup.objects.all().order_by('group_name')
    serializer_class = CampusGroupSerializer


class BlogCategoryView (generics.ListAPIView):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer


class BlogView (viewsets.ReadOnlyModelViewSet):
    queryset = Blog.objects.all().order_by("-created_at")
    serializer_class = BlogSerializer


class EventsView(APIView):
    def get(self, request):
        data = {
            "past": EventSerializer(
                Event.objects.filter(date__lt=datetime.date.today()).order_by("-date"), many=True
            ).data,
            "this_week": EventSerializer(
                Event.objects.filter(
                    date__gte=datetime.date.today(),
                    date__lt=(datetime.date.today() +
                              datetime.timedelta(days=7)),
                ).order_by("-date"),
                many=True,
            ).data,
            "upcoming": EventSerializer(
                Event.objects.filter(
                    date__gte=datetime.date.today() + datetime.timedelta(days=7)
                ).order_by("date"),
                many=True,
            ).data,
        }
        return Response(data, status=status.HTTP_200_OK)


class RaisedQueryView(APIView):
    def post(self, request):
        is_verified = verify_recaptcha(request)
        if is_verified:
            serializer = RaisedQuerySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                mail_raised_query(serializer.data)
                return Response(data={'query': serializer.data}, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        return Response(data={'error': 'ReCAPTCHA not verified.'}, status=status.HTTP_406_NOT_ACCEPTABLE)