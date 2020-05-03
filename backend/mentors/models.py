from django.db import models

from pages.models import branch, CampusGroups


class Interest(models.Model):
    interest_name = models.CharField(
        max_length=100,
        default="",
        unique=True
    )

    def __str__(self):
        return self.interest_name


year_choices = (("3rd", "3rd Year"), ("4th", "4th Year"), ("5th", "5th Year"))


class Mentor(models.Model):
    branch = models.ForeignKey(
        branch,
        related_name="mentors",
        on_delete=models.CASCADE
    )

    interest = models.ManyToManyField(
        Interest,
        related_name="interest",
        blank=True,

    )

    name = models.CharField(
        max_length=1000,
        blank=True,
        null=True
    )
    photo = models.ImageField(
        upload_to="mentors/images",
        max_length=200
    )
    resume = models.FileField(
        upload_to="mentors/resume",
        null=True
    )
    email = models.EmailField(
        max_length=200,
        default="",
        unique=True
    )
    mobile = models.IntegerField(
        null=True,
        unique=True
    )
    enrollno = models.IntegerField(
        unique=True
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
        choices=year_choices
    )
    groups = models.ManyToManyField(
        CampusGroups,
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
