from django.conf.urls import url
from django.urls import include, path

from rest_framework_simplejwt.views import(
    TokenRefreshView,
)

from .views import *

urlpatterns = [
    path("token/", ExchangeToken.as_view()),
    path("token/refresh/", TokenRefreshView.as_view(), name='token_refresh'),
]
