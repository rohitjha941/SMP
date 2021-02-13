from django.contrib.admin import register
from import_export.admin import ImportExportModelAdmin

from .models import *


@register(Branch)
class BranchAdmin(ImportExportModelAdmin):
    list_display = ("branch_name",)


@register(Student)
class StudentAdmin(ImportExportModelAdmin):
    list_display = ("name", "email", "branch")
