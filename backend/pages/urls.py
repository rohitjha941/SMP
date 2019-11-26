 
from os.path import abspath

from django.urls import include, path

from .views import *

urlpatterns = [
 path('home_about/' ,  HomeView.as_view()),
 path('home_vision/' ,  HomeVisionView.as_view()),
 path('faq/', faqView.as_view()),
 path("team/" , StudentTeamView.as_view()),
 path("branch/", branchView.as_view()),
 path("contact_team/", ContactDetailsView.as_view()),
 path("mentors/", MentorView.as_view()),
 path("interests/", InterestView.as_view()) 
    
]
