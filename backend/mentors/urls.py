from django.urls import include, path
from .views import *

urlpatterns = [
    path("interests/", InterestView.as_view()),
    path("apply/", MentorApplicationView.as_view()),
    path("interns/", MentorInternView.as_view()),
    path("placements/", MentorPlacementView.as_view()),
    path("achievements/", MentorAchievementView.as_view()),
    path("<int:pk>/", MentorView.as_view()),
    path("", MentorView.as_view()),
]
