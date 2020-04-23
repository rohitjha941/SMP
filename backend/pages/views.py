import requests
import datetime
import json

from django.db import transaction
from django.template import loader
from django.views.decorators.csrf import ensure_csrf_cookie

from backend.settings import DEFAULT_FROM_EMAIL, SEND_EMAIL_TO, EMAIL_HOST_PASSWORD, RECAPTCHA_SECRET_KEY, RECEIVER_NAME

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

from pages.utils import get_client_ip

from .models import *
from .serializers import *

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


class HomeView(generics.ListAPIView):
    queryset = Home.objects.all()
    serializer_class = HomeSerializer


class HomeVisionView(generics.ListAPIView):
    queryset = HomeVision.objects.all()
    serializer_class = HomeVisionSerializer


class faqView(generics.ListAPIView):
    queryset = faq.objects.all()
    serializer_class = faqSerializer


class StudentTeamView (generics.ListCreateAPIView):
    queryset = StudentTeam.objects.all()
    serializer_class = StudentTeamSerializer


class branchView (generics.ListAPIView):
    queryset = branch.objects.all().order_by('branch_name')
    serializer_class = branchSerializer


class ContactDetailsView(generics.ListAPIView):
    queryset = ContactDetails.objects.all()
    serializer_class = ContactDetailsSerializer


class MentorView (APIView):
    def get(self, request):
        return Response(MentorSerializer(Mentor.objects.all(), many=True).data, status=status.HTTP_200_OK)

    def post(self, request):
        last_used_serializer = None
        try:
            # We will include serializer checks and raise Exception explicitly
            # if they fail. Using atomic transaction will cause complete rollback
            # avoiding inconsistent mentor data in case of query failure.
            with transaction.atomic():
                request_data = request.data
                mentor_serializer = MentorSerializer(data=request_data)
                last_used_serializer = mentor_serializer
                if mentor_serializer.is_valid():
                    mentor_serializer.save()
                    if 'achievements' in request_data:
                        achievements = json.loads(
                            request_data.get('achievements'))
                        for achievement in achievements:
                            achievement_data = dict(
                                mentor=mentor_serializer.data.get('id'),
                                achievement_name=achievement
                            )
                            achievement_serializer = MentorAchievementSerializer(
                                data=achievement_data)
                            last_used_serializer = achievement_serializer
                            if achievement_serializer.is_valid():
                                achievement_serializer.save()
                            else:
                                raise Exception

                    if 'interns' in request_data:
                        interns = json.loads(
                            request_data.get('interns'))
                        for intern in interns:
                            intern_data = dict(
                                mentor=mentor_serializer.data.get('id'),
                                company=intern.get('company'),
                                duration=intern.get('duration'),
                                domain=intern.get('domain')
                            )
                            intern_serializer = MentorInternSerializer(
                                data=intern_data)
                            last_used_serializer = intern_serializer
                            if intern_serializer.is_valid():
                                intern_serializer.save()
                            else:
                                raise Exception
                else:
                    raise Exception
        except Exception:
            return Response(last_used_serializer.errors, status=status.HTTP_409_CONFLICT)
        return Response(mentor_serializer.data, status=status.HTTP_201_CREATED)


class InterestView (generics.ListCreateAPIView):
    queryset = Interest.objects.all().order_by('interest_name')
    serializer_class = InterestSerializer

    def create(self, request):
        interests = []
        interest_ids = []
        try:
            interests = request.data["interests"]
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        for interest in interests:
            instance, created = Interest.objects.get_or_create(
                interest_name=interest)
            interest_ids.append(instance.id)

        data = {
            'interest_ids': interest_ids
        }
        return Response(data, status=status.HTTP_201_CREATED)


class CampusGroupsView (generics.ListAPIView):
    queryset = CampusGroups.objects.all().order_by('group_name')
    serializer_class = CampusGroupsSerializer


class BlogCategoryView (generics.ListCreateAPIView):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer


class BlogsView (generics.ListCreateAPIView):
    queryset = Blogs.objects.all().order_by("-created_at")
    serializer_class = BlogsSerializer


class EventsView(APIView):
    def get(self, request):
        data = {
            "past": EventsSerializer(
                Events.objects.filter(date__lt=datetime.date.today()).order_by("-date"), many=True
            ).data,
            "this_week": EventsSerializer(
                Events.objects.filter(
                    date__gte=datetime.date.today(),
                    date__lt=(datetime.date.today() +
                              datetime.timedelta(days=7)),
                ).order_by("-date"),
                many=True,
            ).data,
            "upcoming": EventsSerializer(
                Events.objects.filter(
                    date__gte=datetime.date.today() + datetime.timedelta(days=7)
                ).order_by("date"),
                many=True,
            ).data,
        }
        return Response(data, status=status.HTTP_200_OK)


class MentorDocsView (generics.ListCreateAPIView):
    queryset = MentorDocs.objects.all()
    serializer_class = MentorDocsSerializer


def send_email(data):
    query_id = data['id']
    query_content = data['query']
    query_name = data['name']
    query_email = data['email']
    subject = subject = '#{} Query raised from smp.iitr.ac.in'.format(query_id)
    message = Mail(
        from_email=DEFAULT_FROM_EMAIL,
        to_emails=SEND_EMAIL_TO,
        subject=subject,
        html_content=loader.render_to_string(
            'mail_template/raise_query.html',
            {
                'receiver_name': RECEIVER_NAME,
                'query_name': query_name,
                'query_content': query_content,
                'query_email': query_email,
                'query_id': query_id
            }
        )
    )
    try:
        sg = SendGridAPIClient(EMAIL_HOST_PASSWORD)
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)


@api_view(('POST',))
@ensure_csrf_cookie
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def raisedQuery(request):
    if request.method == 'POST':
        r = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data={
                'secret': RECAPTCHA_SECRET_KEY,
                'response': request.data['g-recaptcha-response'],
                'remoteip': get_client_ip(request),
            }
        )
        if r.json()['success']:
            serializer = RaisedQuerySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                send_email(serializer.data)
                return Response(data={'query': serializer.data}, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        return Response(data={'error': 'ReCAPTCHA not verified.'}, status=status.HTTP_406_NOT_ACCEPTABLE)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
