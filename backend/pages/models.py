from django.db import models
from tinymce import models as tinymce_models

from common.validators import *
from common.rename import *
from common.models import Student


class Home(models.Model):

    smp_description = models.TextField(
        max_length=1000,
        default=""
    )

    class Meta:
        verbose_name_plural = "Home"


class HomeVision(models.Model):
    title = models.CharField(
        max_length=1000,
        default=""
    )

    description = models.TextField(
        max_length=1000,
        default=""
    )
    image = models.ImageField(
        upload_to=FileUploader("home/", None),
        blank=True,
        null=True
    )

    class Meta:
        verbose_name_plural = "Home Vision"


class Faq(models.Model):

    question = models.CharField(
        max_length=300,
        default="",
    )

    answer = models.CharField(
        max_length=1000,
        default="",
    )
    _for_choices = (
        ('mentor', "MENTOR"),
        ('mentee', "MENTEE")
    )
    _for = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        choices=_for_choices,
        default='mentor'
    )

    def __str__(self):
        return self.question


year_choices_team = (
    ("1st", "1st Year"),
    ("2nd", "2nd Year"),
    ("3rd", "3rd Year"),
    ("4th", "4th Year"),
    ("5th", "5th Year"),
)


class TeamPosition(models.Model):
    position_name = models.CharField(
        default="",
        max_length=100,
    )

    def __str__(self):
        return self.position_name


class StudentTeam(models.Model):
    student = models.ForeignKey(
        Student,
        related_name="team_student",
        on_delete=models.CASCADE
    )
    photo = models.ImageField(
        upload_to=FileUploader("members/", "student"),
        max_length=200
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

    position = models.ForeignKey(
        TeamPosition,
        related_name="team_position",
        on_delete=models.CASCADE,
    )
    year = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        choices=year_choices_team
    )
    mobile = models.CharField(
        max_length=10,
        blank=True,
        null=True,
        unique=True,
        validators=[validate_mobile]
    )


class CampusGroup(models.Model):
    group_name = models.CharField(
        max_length=300,
        default=""
    )
    thumbnail = models.ImageField(
        upload_to="campus_groups/",
        max_length=200,
        null=True
    )
    website = models.URLField(
        max_length=1000,
        db_index=True,
        blank=True
    )

    def __str__(self):
        return self.group_name


class ContactDetails(models.Model):
    name = models.CharField(
        default="",
        max_length=100,
    )
    photo = models.ImageField(
        upload_to="members/",
        max_length=200
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
    branch = models.CharField(
        default="",
        max_length=100,
    )

    year = models.CharField(
        default="",
        max_length=100,
    )

    mobile = models.CharField(
        default="",
        max_length=100,
        validators=[validate_mobile]
    )

    email = models.CharField(
        default="",
        max_length=100,
    )

    class Meta:
        verbose_name_plural = "Contact Details"


class BlogCategory(models.Model):
    category_name = models.CharField(
        max_length=100,
        default="",
        blank=True,
        null=True
    )

    def __str__(self):
        return self.category_name

    class Meta:
        verbose_name_plural = "Blog Categories"


class Blog(models.Model):
    title = models.CharField(
        default="",
        max_length=100,
    )

    author = models.CharField(
        default="",
        max_length=100,
    )

    created_at = models.DateField(
        blank=True,
        null=True
    )

    thumbnail = models.ImageField(
        upload_to=FileUploader("blogs/", "blogs"),
        max_length=200,
        null=True,
        blank=True
    )
    is_featured = models.BooleanField(
        default=False,
    )
    category = models.ForeignKey(
        BlogCategory,
        related_name="blog_category",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    content = tinymce_models.HTMLField()


class Event(models.Model):
    title = models.CharField(
        default="",
        max_length=150,
    )

    date = models.DateField(
        blank=True,
        null=True
    )
    time = models.TimeField(
        blank=True,
        null=True
    )
    thumbnail = models.ImageField(
        upload_to=FileUploader("events/", "events"),
        max_length=200,
        null=True,
        blank=True
    )
    venue = models.CharField(
        default="",
        max_length=100
    )
    content = tinymce_models.HTMLField()


class RaisedQuery(models.Model):
    name = models.CharField(default="", max_length=100)
    email = models.EmailField(max_length=254,)
    query = models.TextField()

    class Meta:
        verbose_name_plural = "Raised Queries"
