import os

from uuid import uuid4

from django.utils.text import slugify
from django.utils.deconstruct import deconstructible

from backend.settings import MEDIA_ROOT


@deconstructible
class UploadToPathAndRename(object):
    """Assigns single and unique filename to each file of each instance of models to prevent multiple occurances and hence save space"""

    def __init__(self, path, file_model):
        """
        Parameters
        ----------
        path : str
            The path of directory in app where file is to be saved
        file_model : str
            Filename is assigned according to the type of file model {'blogs','events', etc.}.
            By default it is assigned as primary key of object.
        """

        self.sub_path = path
        self.file_model = file_model

    def __call__(self, instance, filename):
        """Removes already existing file of same name"""

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
        """Calls rename_func to rename files"""

        rename_func = self.switch_rename_func()
        return rename_func()

    def switch_rename_func(self):
        """Determines which function to call to rename a file, by default call rename_by_id"""

        switcher = {
            'blogs': self.rename_blogs,
            'events': self.rename_events,
            'campus_groups': self.rename_campus_groups,
            'student': self.rename_student,
        }
        return switcher.get(self.file_model, self.rename_by_id)

    def rename_by_id(self):
        """Rename file by id as {primary_key}"""

        if self.instance.id:
            filename = '{}.{}'.format(slugify(self.instance.id), self.ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, self.ext)
        return filename

    def rename_blogs(self):
        """Rename blogs image to {date}_{title}_{author}"""

        if self.instance.title and self.instance.created_at and self.instance.author:
            date_to_str = self.instance.created_at.strftime("%d-%b-%Y")
            filename = '{}_{}_{}.{}'.format(
                slugify(date_to_str), slugify(self.instance.title), slugify(self.instance.author), self.ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, self.ext)
        return filename

    def rename_events(self):
        """Rename events image to {date}_{title}"""

        if self.instance.date and self.instance.title:
            date_o_str = self.instance.date.strftime("%d-%b-%Y")
            filename = '{}-{}.{}'.format(slugify(date_to_str),
                                         slugify(self.instance.title), self.ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, self.ext)
        return filename

    def rename_student(self):
        """Rename student image to enrollno"""

        if self.instance.enrollno:
            filename = '{}.{}'.format(
                slugify(self.instance.enrollno), self.ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, self.ext)
        return filename

    def rename_campus_groups(self, instance, ext):
        """Add this when mentor-profile is merged, to update name of group image"""

        if instance.group_name:
            filename = '{}.{}'.format(slugify(instance.group_name), ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, ext)
        return filename
