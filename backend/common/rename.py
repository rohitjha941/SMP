import os

from uuid import uuid4

from django.utils.text import slugify
from django.utils.deconstruct import deconstructible

from backend.settings import MEDIA_ROOT


@deconstructible
class UploadToPathAndRename(object):

    def __init__(self, path, file_type):
        self.sub_path = path
        self.file_type = file_type

    def __call__(self, instance, filename):
        self.instance = instance
        self.ext = filename.split('.')[-1]
        # Remove the file if it already exists
        filename = self.get_filename()
        if instance.id:
            existing_path = os.path.join(MEDIA_ROOT, self.sub_path, filename)
            if os.path.isfile(existing_path):
                os.remove(existing_path)
        return os.path.join(self.sub_path, filename)

    def get_filename(self):
        rename_func = self.switch_rename_func()
        return rename_func()

    def switch_rename_func(self):
        switcher = {
            'blogs': self.rename_blogs,
            'events': self.rename_events,
            'campus_groups': self.rename_campus_groups,
            'student': self.rename_student,
        }
        return switcher.get(self.file_type, self.rename_by_id)

    # Rename file by id as {primary_key}

    def rename_by_id(self):
        if self.instance.id:
            filename = '{}.{}'.format(slugify(self.instance.id), self.ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, self.ext)
        return filename

    # Rename blogs image to {date}_{title}_{author}
    def rename_blogs(self):
        if self.instance.title and self.instance.created_at and self.instance.author:
            dateToStr = self.instance.created_at.strftime("%d-%b-%Y")
            filename = '{}_{}_{}.{}'.format(
                slugify(dateToStr), slugify(self.instance.title), slugify(self.instance.author), self.ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, self.ext)
        return filename

    # Rename events image to {date}_{title}
    def rename_events(self):
        if self.instance.date and self.instance.title:
            dateToStr = self.instance.date.strftime("%d-%b-%Y")
            filename = '{}-{}.{}'.format(slugify(dateToStr),
                                         slugify(self.instance.title), self.ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, self.ext)
        return filename

    # Rename student image to enrollno

    def rename_student(self):
        if self.instance.enrollno:
            filename = '{}.{}'.format(
                slugify(self.instance.enrollno), self.ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, self.ext)
        return filename

    # Add this when mentor-profile is merged, to update name of group image
    def rename_campus_groups(self, instance, ext):
        if instance.group_name:
            filename = '{}.{}'.format(slugify(instance.group_name), ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, ext)
        return filename
