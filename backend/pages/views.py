from django.shortcuts import render
from django.core.mail import send_mail
from django.template import loader
import requests
from pages.utils  import get_client_ip

from backend.settings import EMAIL_HOST_USER
from backend.settings import EMAIL_SEND_TO_ADMIN
from backend.settings import RECAPTCHA_SECRET_KEY
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser

from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework import generics

class HomeView (generics.ListAPIView):
    queryset = Home.objects.all()
    serializer_class = HomeSerializer

class HomeVisionView (generics.ListAPIView):
    queryset = HomeVision.objects.all()
    serializer_class = HomeVisionSerializer

class faqView (generics.ListAPIView):
    queryset = faq.objects.all()
    serializer_class = faqSerializer

class StudentTeamView (generics.ListAPIView):
    queryset = StudentTeam.objects.all()
    serializer_class = StudentTeamSerializer

class branchView (generics.ListAPIView):
    queryset = branch.objects.all()
    serializer_class = branchSerializer

class ContactDetailsView (generics.ListAPIView):
    queryset = ContactDetails.objects.all()
    serializer_class = ContactDetailsSerializer

class MentorView (viewsets.ModelViewSet):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer

class InterestView (viewsets.ModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer


class BlogsView (viewsets.ModelViewSet):
    queryset = Blogs.objects.all()
    serializer_class = BlogsSerializer

class EventsView (viewsets.ModelViewSet):
    queryset = Events.objects.all()
    serializer_class = EventsSerializer

class MentorDocsView (viewsets.ModelViewSet):
    queryset = MentorDocs.objects.all()
    serializer_class = MentorDocsSerializer


def send_email():
    query_id =RaisedQuerySerializer.query_id
    query_content = RaisedQuerySerializer.query
    query_name = RaisedQuerySerializer.name
    query_email = RaisedQuerySerializer.email
    subject=('#'+str(query_id)+' Query raised from smp.iitr.ac.in')
    message = ''
    recepient = EMAIL_SEND_TO_ADMIN

    html_message = loader.render_to_string(
        'mail_template/raise_query.html',
        {
            'reciever_name': 'Laksh',
            'query_name':  query_name,
            'query_content': query_content,
            'query_email': query_email,
            'query_id' : query_id
        }
    )
    send_mail(subject, message, EMAIL_HOST_USER, [recepient], fail_silently = False,html_message=html_message)

class RaisedQueryView (viewsets.ModelViewSet):
    queryset = RaisedQuery.objects.all()
    serializer_class = RaisedQuerySerializer

    def post(self, request, format=None):
        r = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data={
                'secret': RECAPTCHA_SECRET_KEY,
                'response': request.data['g-recaptcha-response'],
                'remoteip': get_client_ip(self.request),
            }
        )
        if r.json()['success']:
            return self.create(request)
        return Response(data={'error':'ReCAPTCHA not verified.'}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def create(self,request,format=None):
        response = super(RaisedQueryView, self).create(request)
        send_email()
        return response