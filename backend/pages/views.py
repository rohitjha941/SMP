import datetime

import requests
from django.core.mail import send_mail
from django.shortcuts import render
from django.template import loader
from django.views.decorators.csrf import ensure_csrf_cookie
from pages.utils import get_client_ip
from rest_framework import generics, status, viewsets
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.settings import EMAIL_HOST_USER, EMAIL_SEND_TO_ADMIN, RECAPTCHA_SECRET_KEY

from .models import *
from .serializers import *


class HomeView(generics.ListAPIView):
    queryset = Home.objects.all()
    serializer_class = HomeSerializer


class HomeVisionView(generics.ListAPIView):
    queryset = HomeVision.objects.all()
    serializer_class = HomeVisionSerializer


class faqView(generics.ListAPIView):
    queryset = faq.objects.all()
    serializer_class = faqSerializer


class StudentTeamView(generics.ListAPIView):
    queryset = StudentTeam.objects.all()
    serializer_class = StudentTeamSerializer


class branchView(generics.ListAPIView):
    queryset = branch.objects.all()
    serializer_class = branchSerializer


class ContactDetailsView(generics.ListAPIView):
    queryset = ContactDetails.objects.all()
    serializer_class = ContactDetailsSerializer


class MentorView(viewsets.ModelViewSet):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer


class InterestView(viewsets.ModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer


class BlogCategoryView(viewsets.ModelViewSet):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer


class BlogsView(viewsets.ModelViewSet):
    queryset = Blogs.objects.all()
    serializer_class = BlogsSerializer


class EventsView(APIView):
    def get(self, request):
        data = {
            "past": EventsSerializer(
                Events.objects.filter(date__lt=datetime.date.today()), many=True
            ).data,
            "this_week": EventsSerializer(
                Events.objects.filter(
                    date__gte=datetime.date.today(),
                    date__lt=(datetime.date.today() +
                              datetime.timedelta(days=7)),
                ),
                many=True,
            ).data,
            "upcoming": EventsSerializer(
                Events.objects.filter(
                    date__gte=datetime.date.today() + datetime.timedelta(days=7)
                ),
                many=True,
            ).data,
        }
        return Response(data, status=status.HTTP_200_OK)


class MentorDocsView(viewsets.ModelViewSet):
    queryset = MentorDocs.objects.all()
    serializer_class = MentorDocsSerializer


def send_email(request):
    serializer = RaisedQuerySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        query_id = serializer.data["id"]
        query_content = serializer.data["query"]
        query_name = serializer.data["name"]
        query_email = serializer.data["email"]
        subject = "#" + str(query_id) + " Query raised from smp.iitr.ac.in"
        message = ""
        recepient = EMAIL_SEND_TO_ADMIN

        html_message = loader.render_to_string(
            "mail_template/raise_query.html",
            {
                "reciever_name": "Laksh",
                "query_name": query_name,
                "query_content": query_content,
                "query_email": query_email,
                "query_id": query_id,
            },
        )
        send_mail(
            subject,
            message,
            EMAIL_HOST_USER,
            [recepient],
            fail_silently=False,
            html_message=html_message,
        )


@api_view(("POST",))
@ensure_csrf_cookie
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def raisedQuery(request):
    if request.method == "POST":
        r = requests.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data={
                "secret": RECAPTCHA_SECRET_KEY,
                "response": request.data["g-recaptcha-response"],
                "remoteip": get_client_ip(request),
            },
        )
        if r.json()["success"]:
            send_email(request)
            return Response(data={"post": "post"}, status=status.HTTP_201_CREATED)
        return Response(
            data={"error": "ReCAPTCHA not verified."},
            status=status.HTTP_406_NOT_ACCEPTABLE,
        )
    return Response(data={"post": "post"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
