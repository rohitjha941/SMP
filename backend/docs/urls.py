from django.urls import include, path
from .views import *

urlpatterns = [
    path('freshers-guide/', FresherDocumentView.as_view()),
    path('mentor-docs/', MentorDocumentView.as_view()),
]
