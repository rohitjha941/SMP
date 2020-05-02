

from django.urls import include, path
from .views import *

from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'blogs', BlogsView)

urlpatterns = [
    path('faq/', faqView.as_view()),
    path("branch/", branchView.as_view()),
    path('campusGroups/', CampusGroupsView.as_view()),
    path('raise-query/', raisedQueryView.as_view()),
    path("blogCategory/", BlogCategoryView.as_view()),
    path("team/", StudentTeamView.as_view()),
    path("events/", EventsView.as_view()),
]

urlpatterns += router.urls