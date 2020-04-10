

from django.urls import include, path
from .views import *

urlpatterns = [
    path('faq/', faqView.as_view()),
    path("branch/", branchView.as_view()),
    path('campusGroups/', CampusGroupsView.as_view()),
    path('raise-query/', raisedQuery, name='raise_query'),
    path("blogCategory/", BlogCategoryView.as_view()),
    path("team/", StudentTeamView.as_view()),
    path("mentorsDocs/", MentorDocsView.as_view()),
    path("events/", EventsView.as_view()),
    path("blogs/", BlogsView.as_view()),



    path("interests/", InterestView.as_view()),
    path("mentors/", MentorView.as_view()),
    path("mentors/achievements/", MentorAchievementView.as_view()),
    path("mentors/intern/", MentorInternView.as_view()),

]
