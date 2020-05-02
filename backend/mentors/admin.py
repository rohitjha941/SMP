from django.contrib import admin
from django.contrib.admin import register
from import_export.admin import ImportExportModelAdmin

from .models import *
# Register your models here.


@register(MentorIntern)
class MentorIntern(ImportExportModelAdmin):
    list_display = ('mentor', 'company', 'duration', 'domain', )


@register(MentorPlacement)
class MentorPlacement(ImportExportModelAdmin):
    list_display = ('mentor', 'company', 'job_title', )


@register(MentorAchievement)
class MentorAchievement(ImportExportModelAdmin):
    list_display = ('mentor', 'achievement_name', )


@register(Interest)
class InterestsAdmin(ImportExportModelAdmin):
    list_display = ("interest_name",)


@register(Mentor)
class MentorAdmin(ImportExportModelAdmin):
    list_display = ('branch', 'name', 'photo', 'facebook', 'linkedin', )
