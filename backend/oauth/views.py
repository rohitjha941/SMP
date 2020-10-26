from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from backend.settings import GOOGLE_OAUTH_CLIENT_ID

from google.oauth2 import id_token
from google.auth.transport import requests

from mentors.models import MentorApplication
from common.utils import is_iitr_email


# Create your views here.

class ExchangeToken(APIView):
    def post(self, request):
        """
        Exchange google auth token with Simple JWT
        """

        google_token = request.data['token']
        CLIENT_ID = GOOGLE_OAUTH_CLIENT_ID
        try:
            idinfo = id_token.verify_oauth2_token(
                google_token, requests.Request(), CLIENT_ID)
            user_email = idinfo['email']
            # if not is_iitr_email(user_email):
            #     return Response({'msg': 'Please use institute email ID', 'success': False},
            #                     status=status.HTTP_401_UNAUTHORIZED)
            try:
                user = User.objects.get(email=user_email)
            except User.DoesNotExist:
                user = User()
                user.username = user_email
                user.email = user_email
                user.save()
            token = RefreshToken.for_user(user)

            response = dict(
                username=user.username,
                access_token=str(token.access_token),
                refresh_token=str(token),
                user=user.id,
                exp_time=token.access_token.payload['exp'],
                msg='Successfully Logged In'
            )
            return Response(response, status=status.HTTP_200_OK)
        except ValueError:
            return Response({'msg': 'Incorrect Token', 'success': False}, status=status.HTTP_401_UNAUTHORIZED)
