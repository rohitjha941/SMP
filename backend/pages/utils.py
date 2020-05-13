import os

from uuid import uuid4

from django.utils.text import slugify
from django.utils.deconstruct import deconstructible

from backend.settings import MEDIA_ROOT

# Rename file to id of instance
@deconstructible
class UploadToPathAndRename(object):

    def __init__(self, path):
        self.sub_path = path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]

        if instance.id:
            filename = '{}.{}'.format(slugify(instance.id), ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, ext)

        # Remove the file if it already exists
        if instance.id:
            existing_path = os.path.join(MEDIA_ROOT, self.sub_path, filename)
            if os.path.isfile(existing_path):
                os.remove(existing_path)

        return os.path.join(self.sub_path, filename)

# Rename blogs image to {date}_{title}
@deconstructible
class UploadToPathAndRenameBlogs(object):

    def __init__(self, path):
        self.sub_path = path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]

        if instance.title and instance.created_at and instance.author:
            dateToStr = instance.created_at.strftime("%d-%b-%Y")
            filename = '{}_{}_{}.{}'.format(
                slugify(dateToStr), slugify(instance.title), slugify(instance.author), ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, ext)

        # Remove the file if it already exists
        if instance.id:
            existing_path = os.path.join(MEDIA_ROOT, self.sub_path, filename)
            if os.path.isfile(existing_path):
                os.remove(existing_path)

        return os.path.join(self.sub_path, filename)


# Rename events image to {date}_{title}
@deconstructible
class UploadToPathAndRenameEvents(object):

    def __init__(self, path):
        self.sub_path = path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]

        if instance.date and instance.title:
            dateToStr = instance.date.strftime("%d-%b-%Y")
            filename = '{}-{}.{}'.format(slugify(dateToStr),
                                         slugify(instance.title), ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, ext)

        # Remove the file if it already exists
        if instance.id:
            existing_path = os.path.join(MEDIA_ROOT, self.sub_path, filename)
            if os.path.isfile(existing_path):
                os.remove(existing_path)

        return os.path.join(self.sub_path, filename)


# Rename student image to enrollno
@deconstructible
class UploadToPathAndRenameStudentTeam(object):

    def __init__(self, path):
        self.sub_path = path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]

        if instance.enrollno:
            filename = '{}.{}'.format(slugify(instance.enrollno), ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, ext)

        # Remove the file if it already exists
        if instance.id:
            existing_path = os.path.join(MEDIA_ROOT, self.sub_path, filename)
            if os.path.isfile(existing_path):
                os.remove(existing_path)

        return os.path.join(self.sub_path, filename)


# Add this when mentor-profile is merged, to update name of group image
@deconstructible
class UploadToPathAndRenameCampusGroups(object):

    def __init__(self, path):
        self.sub_path = path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]

        if instance.group_name:
            filename = '{}.{}'.format(slugify(instance.group_name), ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, ext)

        # Remove the file if it already exists
        if instance.id:
            existing_path = os.path.join(MEDIA_ROOT, self.sub_path, filename)
            if os.path.isfile(existing_path):
                os.remove(existing_path)

        return os.path.join(self.sub_path, filename)
