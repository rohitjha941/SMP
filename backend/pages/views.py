from django.shortcuts import render
from django.core.mail import send_mail
from django.template import loader


from backend.settings import EMAIL_HOST_USER
from backend.settings import EMAIL_SEND_TO_ADMIN
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

class StudentTeamView (viewsets.ModelViewSet):
    queryset = StudentTeam.objects.all()
    serializer_class = StudentTeamSerializer

class branchView (generics.ListAPIView):
    queryset = branch.objects.all().order_by('branch_name')
    serializer_class = branchSerializer

class ContactDetailsView (generics.ListAPIView):
    queryset = ContactDetails.objects.all()
    serializer_class = ContactDetailsSerializer

class MentorView (viewsets.ModelViewSet):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer

class InterestView (viewsets.ModelViewSet):
    queryset = Interest.objects.all().order_by('interest_name')
    serializer_class = InterestSerializer

class CampusGroupsView (generics.ListAPIView):
    queryset = CampusGroups.objects.all().order_by('group_name')
    serializer_class = CampusGroupsSerializer

class BlogsView (viewsets.ModelViewSet):
    queryset = Blogs.objects.all()
    serializer_class = BlogsSerializer

class EventsView (viewsets.ModelViewSet):
    queryset = Events.objects.all()
    serializer_class = EventsSerializer

class MentorDocsView (viewsets.ModelViewSet):
    queryset = MentorDocs.objects.all()
    serializer_class = MentorDocsSerializer

class RaisedQuery(generics.ListCreateAPIView):
    queryset = RaisedQuery.objects.all()
    serializer_class = RaisedQuerySerializer

    def post(self, request, format=None):
        data = JSONParser().parse(request)
        serializer = RaisedQuerySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            query_id = serializer.data['id']
            query_content = serializer.data['query']
            query_name = serializer.data['name']
            query_email = serializer.data['email']
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
            return Response(query_id, status=status.HTTP_201_CREATED)
        return Response('hello', status = status.HTTP_400_BAD_REQUEST)