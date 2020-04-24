from django.db import models


class FresherDocument(models.Model):
    name = models.CharField(
        max_length=100
    )
    document = models.FileField(
        upload_to='fresherDocs',
    )
