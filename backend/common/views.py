from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from .models import Branch
from mentors.models import MentorApplication
from .serializers import BranchSerializer
from rest_framework.response import Response


class BranchView (generics.ListAPIView):
    queryset = Branch.objects.all().order_by('branch_name')
    serializer_class = BranchSerializer


class UserDetailView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = request.user.pk
        try:
            num_results = MentorApplication.objects.get(user=user_id).count()
            has_applied = True if num_results > 0 else False
        except:
            has_applied = False

        try:
            mentor_application = MentorApplication.objects.get(user=user_id)
            is_mentor = mentor_application.is_accepted
        except:
            is_mentor = False

        response = dict(user_id=user_id, name=request.user.first_name, email=request.user.email,
                        has_applied=has_applied, is_mentor=is_mentor)
        return Response(response, status=status.HTTP_200_OK)
