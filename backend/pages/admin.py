from django.contrib import admin
from django.contrib.admin import register
from import_export.admin import ImportExportModelAdmin

from .models import *


@register(Home)
class HomeAdmin(ImportExportModelAdmin):
    list_display = ("smp_description", )


@register(HomeVision)
class HomeVisionAdmin(ImportExportModelAdmin):
    list_display = ('title', 'description', 'image', )


@register(Faq)
class FaqVisionAdmin(ImportExportModelAdmin):
    list_display = ('_for', 'question', 'answer', )


@register(TeamPosition)
class TeamPositionAdmin(ImportExportModelAdmin):
    list_display = ('position_name',)


@register(StudentTeam)
class StudentTeamAdmin(ImportExportModelAdmin):
    list_display = ('get_name', 'photo', 'facebook', 'linkedin',
                    'get_branch', 'year', 'position',)

    def get_branch(self, obj):
        return obj.student.branch

    def get_name(self, obj):
        return obj.student.name

    get_branch.short_description = 'Branch'
    get_branch.admin_order_field = 'student__branch'

    get_name.short_description = 'Name'
    get_name.admin_order_field = 'student__name'


@register(ContactDetails)
class ContactDetailsAdmin(ImportExportModelAdmin):
    list_display = ('name', 'photo', 'facebook', 'linkedin',
                    'branch', 'year', 'mobile', 'email', )


@register(BlogCategory)
class BlogCategoryAdmin(ImportExportModelAdmin):
    list_display = ("category_name",)


@register(Blog)
class BlogAdmin(ImportExportModelAdmin):
    list_display = ('created_at', 'title', 'author',)


@register(Event)
class EventAdmin(ImportExportModelAdmin):
    list_display = ('date', 'title', 'venue',)


@register(CampusGroup)
class CampusGroupAdmin(ImportExportModelAdmin):
    list_display = ('group_name',)


@register(RaisedQuery)
class RaisedQuery(ImportExportModelAdmin):
    list_display = ('id', 'name', 'email', 'query')
