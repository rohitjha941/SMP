from django.contrib import admin
from django.contrib.admin import register
from .models import *
from import_export.admin import ImportExportModelAdmin


@register(Home)
class HomeAdmin(ImportExportModelAdmin):
    list_display = ("smp_description" , ) 

@register(HomeVision)
class HomeVisionAdmin(ImportExportModelAdmin):
    list_display = ('title', 'description', 'image', ) 
@register(faq)
class faqVisionAdmin(ImportExportModelAdmin):
    list_display = ('_for','question', 'answer', )


@register(StudentTeam)
class StudentTeamAdmin(ImportExportModelAdmin):
    list_display = ('name', 'photo', 'facebook', 'linkden', 'branch', 'year', 'is_coordinator','position',) 

@register(branch)
class branchAdmin(ImportExportModelAdmin):
    list_display = ("branch_name", )

@register(ContactDetails)
class branchAdmin(ImportExportModelAdmin):
    list_display =  ('name', 'photo', 'facebook', 'linkden', 'branch', 'year', 'mobile', 'email', )

@register(Mentor)
class MentorAdmin(ImportExportModelAdmin):
    list_display =  ('name', 'year','branch', 'facebook', 'linkden', )

@register(BlogCategory)
class BlogCategoryAdmin(ImportExportModelAdmin):
    list_display = ('category_name',)

@register(Blogs)
class BlogsAdmin(ImportExportModelAdmin):
    list_display =  ('created_at', 'title','author',)

@register(Events)
class EventsAdmin(ImportExportModelAdmin):
    list_display =  ('date','title', 'venue',)

@register(MentorDocs)
class MentorDocsAdmin(ImportExportModelAdmin):
    list_display = ('name','document')

@register(Interest)
class InterestsAdmin(ImportExportModelAdmin):
    list_display = ('interest_name',)

@register(RaisedQuery)
class RaisedQuery(ImportExportModelAdmin):
    list_display = ('id','name','email','query')