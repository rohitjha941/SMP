from django.contrib import admin
from django.contrib.admin import register
from import_export.admin import ImportExportModelAdmin

from .models import *
# Register your models here.


class InternInline(admin.TabularInline):
    model = MentorIntern
    extra = 0


class PlacementInline(admin.TabularInline):
    model = MentorPlacement
    extra = 0


class AchievementInline(admin.TabularInline):
    model = MentorAchievement
    extra = 0


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
    list_display = ('id', 'get_branch', 'get_name',
                    'photo', 'facebook', 'linkedin', )
    inlines = [InternInline, PlacementInline, AchievementInline]

    def get_branch(self, obj):
        return obj.student.branch

    def get_name(self, obj):
        return obj.student.name

    get_branch.short_description = 'Branch'
    get_branch.admin_order_field = 'student__branch'

    get_name.short_description = 'Name'
    get_name.admin_order_field = 'student__name'


@register(MentorApplication)
class MentorApplicationAdmin(ImportExportModelAdmin):
    list_display = ('get_branch', 'get_name', 'year', 'get_enroll_no')

    def get_branch(self, obj):
        return obj.student.branch

    def get_name(self, obj):
        return obj.student.name

    def get_enroll_no(self, obj):
        return obj.student.enroll_no

    get_branch.short_description = 'Branch'
    get_branch.admin_order_field = 'student__branch'

    get_name.short_description = 'Name'
    get_name.admin_order_field = 'student__name'

    get_enroll_no.short_description = 'Enrollment Number'
    get_enroll_no.admin_order_field = 'student__enroll_no'
