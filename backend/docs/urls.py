from django.urls import include, path
from .views import *

urlpatterns = [
    path('freshers-guide/', FresherDocumentView.as_view()),
]
