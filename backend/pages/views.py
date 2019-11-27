from django.shortcuts import render
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