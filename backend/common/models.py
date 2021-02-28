from django.db import models

from .validators import *


class Branch(models.Model):
    branch_name = models.CharField(
        max_length=100,
        default=""
    )

    def __str__(self):
        return self.branch_name

    class Meta:
        verbose_name_plural = "Branches"


class Student(models.Model):
    user = models.OneToOneField(
        'auth.User',
        related_name='student_user',
        on_delete=models.CASCADE,
    )
    name = models.CharField(
        max_length=1000,
        blank=True,
        null=True
    )
    branch = models.ForeignKey(
        Branch,
        related_name="student_branch",
        on_delete=models.CASCADE
    )
    email = models.EmailField(
        max_length=200,
        default="",
        unique=True,
        validators=[validate_iitr_email]
    )
    enroll_no = models.IntegerField(
        unique=True,
        validators=[validate_enroll]
    )

    def __str__(self):
        return self.name
