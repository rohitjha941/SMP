import requests
import datetime

from django.views.decorators.csrf import ensure_csrf_cookie

from backend.settings import RECAPTCHA_SECRET_KEY

from rest_framework import generics, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

from pages.utils import get_client_ip

from .models import *
from .serializers import *

from mail.mailer import mail_raised_query


class HomeView(generics.ListAPIView):
    queryset = Home.objects.all()
    serializer_class = HomeSerializer


class HomeVisionView(generics.ListAPIView):
    queryset = HomeVision.objects.all()
    serializer_class = HomeVisionSerializer


class faqView(generics.ListAPIView):
    queryset = faq.objects.all()
    serializer_class = faqSerializer


class StudentTeamView (generics.ListAPIView):
    queryset = StudentTeam.objects.all()
    serializer_class = StudentTeamSerializer


class branchView (generics.ListAPIView):
    queryset = branch.objects.all().order_by('branch_name')
    serializer_class = branchSerializer


class ContactDetailsView(generics.ListAPIView):
    queryset = ContactDetails.objects.all()
    serializer_class = ContactDetailsSerializer


class CampusGroupsView (generics.ListAPIView):
    queryset = CampusGroups.objects.all().order_by('group_name')
    serializer_class = CampusGroupsSerializer


class BlogCategoryView (generics.ListAPIView):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer


class BlogsView (viewsets.ReadOnlyModelViewSet):
    queryset = Blogs.objects.all().order_by("-created_at")
    serializer_class = BlogsSerializer


class EventsView(APIView):
    def get(self, request):
        data = {
            "past": EventsSerializer(
                Events.objects.filter(date__lt=datetime.date.today()).order_by("-date"), many=True
            ).data,
            "this_week": EventsSerializer(
                Events.objects.filter(
                    date__gte=datetime.date.today(),
                    date__lt=(datetime.date.today() +
                              datetime.timedelta(days=7)),
                ).order_by("-date"),
                many=True,
            ).data,
            "upcoming": EventsSerializer(
                Events.objects.filter(
                    date__gte=datetime.date.today() + datetime.timedelta(days=7)
                ).order_by("date"),
                many=True,
            ).data,
        }
        return Response(data, status=status.HTTP_200_OK)


@api_view(('POST',))
@ensure_csrf_cookie
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def raisedQuery(request):
    if request.method == 'POST':
        r = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data={
                'secret': RECAPTCHA_SECRET_KEY,
                'response': request.data['g-recaptcha-response'],
                'remoteip': get_client_ip(request),
            }
        )
        if r.json()['success']:
            serializer = RaisedQuerySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                mail_raised_query(serializer.data)
                return Response(data={'query': serializer.data}, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        return Response(data={'error': 'ReCAPTCHA not verified.'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
