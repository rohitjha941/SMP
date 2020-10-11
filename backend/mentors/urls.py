from django.urls import include, path
from .views import *

urlpatterns = [
    path("interests/", InterestView.as_view()),
    path("", MentorView.as_view()),
]