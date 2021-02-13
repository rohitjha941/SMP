from rest_framework import generics
from .models import Branch

from .serializers import BranchSerializer


class BranchView (generics.ListAPIView):
    queryset = Branch.objects.all().order_by('branch_name')
    serializer_class = BranchSerializer
