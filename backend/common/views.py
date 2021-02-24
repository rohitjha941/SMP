from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from .models import Branch, Student
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
        student_exists = Student.objects.filter(
            user=request.user.id).count() > 0
        has_applied = False
        is_mentor = False
        if student_exists:
            student_id = Student.objects.get(user=request.user.id).id
            has_applied = MentorApplication.objects.filter(
                student=student_id).count() > 0
            if has_applied:
                is_mentor = MentorApplication.objects.get(
                    student=student_id).is_accepted

        response = dict(user_id=user_id, name=request.user.first_name, email=request.user.email,
                        has_applied=has_applied, is_mentor=is_mentor)
        return Response(response, status=status.HTTP_200_OK)
