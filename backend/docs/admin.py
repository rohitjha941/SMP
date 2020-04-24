from django.contrib import admin
from django.contrib.admin import register
from import_export.admin import ImportExportModelAdmin

from .models import *


@register(FresherDocument)
class FresherDocumentAdmin(ImportExportModelAdmin):
    list_display = ('name', 'document')


@register(MentorDocument)
class MentorDocumentAdmin(ImportExportModelAdmin):
    list_display = ('name', 'document')