
 
from django.urls import include, path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'interests', InterestView)
router.register(r'mentors', MentorView)
router.register(r'blogs', BlogsView)
router.register(r'events',EventsView)
router.register(r'mentorsDocs',MentorDocsView)
router.register(r'blogCategory',BlogCategoryView)

urlpatterns = [
    # path('home_about/',  HomeView.as_view()),
    # path('home_vision/',  HomeVisionView.as_view()),
    path('faq/', faqView.as_view()),
    path("team/", StudentTeamView.as_view()),
    path("branch/", branchView.as_view()),
    path('raise-query/', raisedQuery, name='raise_query'),    
    # path("contact_team/", ContactDetailsView.as_view()),
]
urlpatterns = urlpatterns + router.urls