

from django.urls import include, path
from .views import *

from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'blogs', BlogsView)

urlpatterns = [
    path('faq/', FaqView.as_view()),
    path("branch/", BranchView.as_view()),
    path('campus-groups/', CampusGroupsView.as_view()),
    path('raise-query/', RaisedQueryView.as_view()),
    path("blog-category/", BlogCategoryView.as_view()),
    path("team/", StudentTeamView.as_view()),
    path("events/", EventsView.as_view()),
]

urlpatterns += router.urls