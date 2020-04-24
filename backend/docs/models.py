from django.db import models


class Document(models.Model):
    name = models.CharField(
        max_length=100
    )
    document = models.FileField(
        upload_to='fresherDocs',
    )

    class Meta:
        abstract = True


class FresherDocument(Document):
    pass


class MentorDocument(Document):
    pass
