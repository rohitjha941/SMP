import os

from uuid import uuid4

from django.utils.deconstruct import deconstructible

from backend.settings import MEDIA_ROOT


@deconstructible
class UploadToPathAndRenameMentors(object):

    def __init__(self, path):
        self.sub_path = path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]

        if instance.enrollno:
            filename = '{}.{}'.format(instance.enrollno, ext)
        else:
            filename = '{}.{}'.format(uuid4().hex, ext)

        # Remove the file if it already exists
        if instance.id:
            existing_path = os.path.join(MEDIA_ROOT, self.sub_path, filename)
            if os.path.isfile(existing_path):
                os.remove(existing_path)

        return os.path.join(self.sub_path, filename)
