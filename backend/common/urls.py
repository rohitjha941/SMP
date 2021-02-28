from django.urls import path
from .views import *

urlpatterns = [
    path("branch/", BranchView.as_view()),
    path("user-details/", UserDetailView.as_view()),
]
