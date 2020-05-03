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


@register(StudentTeam)
class StudentTeamAdmin(ImportExportModelAdmin):
    list_display = ('name', 'photo', 'facebook', 'linkedin',
                    'branch', 'year', 'position',)


@register(Branch)
class BranchAdmin(ImportExportModelAdmin):
    list_display = ("branch_name",)


@register(ContactDetails)
class ContactDetailsAdmin(ImportExportModelAdmin):
    list_display = ('name', 'photo', 'facebook', 'linkedin',
                    'branch', 'year', 'mobile', 'email', )


@register(BlogCategory)
class BlogCategoryAdmin(ImportExportModelAdmin):
    list_display = ("category_name",)


@register(Blogs)
class BlogsAdmin(ImportExportModelAdmin):
    list_display = ('created_at', 'title', 'author',)


@register(Events)
class EventsAdmin(ImportExportModelAdmin):
    list_display = ('date', 'title', 'venue',)


@register(CampusGroups)
class CampusGroupsAdmin(ImportExportModelAdmin):
    list_display = ('group_name',)


@register(RaisedQuery)
class RaisedQuery(ImportExportModelAdmin):
    list_display = ('id', 'name', 'email', 'query')
