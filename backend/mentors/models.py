from django.db import models

from pages.models import CampusGroup

from common.rename import FileUploader
from common.validators import *
from common.models import Student


class Interest(models.Model):
    interest_name = models.CharField(
        max_length=100,
        default="",
        unique=True
    )

    def __str__(self):
        return self.interest_name


mentor_year_choices = (("3rd", "3rd Year"),
                       ("4th", "4th Year"), ("5th", "5th Year"))


class Mentor(models.Model):
    student = models.ForeignKey(
        Student,
        related_name="mentor_student",
        on_delete=models.CASCADE
    )
    interest = models.ManyToManyField(
        Interest,
        related_name="interest",
        blank=True,
    )
    photo = models.ImageField(
        upload_to=FileUploader("mentors/images", 'student'),
        max_length=200,
        null=True
    )
    resume = models.FileField(
        upload_to=FileUploader("mentors/resume", 'student'),
        null=True
    )
    mobile = models.CharField(
        max_length=10,
        blank=True,
        null=True,
        unique=True,
        validators=[validate_mobile]
    )
    facebook = models.URLField(
        max_length=1000,
        db_index=True,
        blank=True
    )
    linkedin = models.URLField(
        max_length=1000,
        db_index=True,
        blank=True
    )
    year = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        choices=mentor_year_choices
    )
    groups = models.ManyToManyField(
        CampusGroup,
        related_name="campus_groups_mentor",
        blank=True
    )
    career = models.CharField(
        max_length=100,
        blank=True
    )


class MentorAchievement(models.Model):
    mentor = models.ForeignKey(
        Mentor,
        related_name="mentor_achievement",
        on_delete=models.CASCADE
    )

    achievement_name = models.CharField(
        max_length=100,
        blank=True,
        null=True,
    )


class MentorIntern(models.Model):
    mentor = models.ForeignKey(
        Mentor,
        related_name="mentor_intern",
        on_delete=models.CASCADE
    )

    company = models.TextField(
        max_length=500,
        blank=True,
        null=True
    )

    duration = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    domain = models.TextField(
        max_length=500,
        blank=True,
        null=True
    )


class MentorPlacement(models.Model):
    mentor = models.ForeignKey(
        Mentor,
        related_name="mentor_placement",
        on_delete=models.CASCADE
    )
    company = models.TextField(
        max_length=500,
        blank=True,
        null=True
    )
    job_title = models.CharField(
        max_length=500,
        blank=True,
        null=True,
    )


class MentorApplication(models.Model):
    student = models.ForeignKey(
        Student,
        related_name="mentor_application_student",
        on_delete=models.CASCADE
    )
    is_accepted = models.BooleanField(
        default=False,
    )
    year = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        choices=mentor_year_choices
    )
    motivation = models.TextField(
        max_length=1000,
        blank=True,
        null=True
    )
    qualities = models.TextField(
        max_length=1000,
        blank=True,
        null=True
    )
    mobile = models.CharField(
        max_length=10,
        blank=True,
        null=True,
        unique=True,
        validators=[validate_mobile]
    )
    resume = models.FileField(
        upload_to=FileUploader("mentors/applied/resume", 'student'),
        null=True
    )
