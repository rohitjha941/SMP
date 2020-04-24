from django.db import models
from tinymce import models as tinymce_models


class Home(models.Model):

    smp_description = models.TextField(
        max_length=1000,
        default=""
    )


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
        upload_to="home/",
        blank=True,
        null=True
    )


class faq(models.Model):

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


class branch(models.Model):
    branch_name = models.CharField(
        max_length=100,
        default=""
    )

    def __str__(self):
        return self.branch_name


year_choices_team = (
    ("1st", "1st Year"),
    ("2nd", "2nd Year"),
    ("3rd", "3rd Year"),
    ("4th", "4th Year"),
    ("5th", "5th Year"),
)

position_choices = (
    ('Manager', "Manager"),
    ('Coordinator', 'Coordinator')
)

vertical_choices = (
    ('Admin', 'Admin'),
    ('Operations', 'Operations'),
    ('WebD', 'WebD'),
    ('Eventts', 'Events'),
    ('Content', 'Content'),
    ('Design', 'Design'),
)


class StudentTeam(models.Model):

    # Field Containing name.
    name = models.CharField(
        default="",
        max_length=100,
    )

    # Field Containing Images of members
    photo = models.ImageField(
        upload_to="members/",
        max_length=200
    )

    # Field Containing Facebook URL
    facebook = models.URLField(
        max_length=1000,
        db_index=True,

        blank=True
    )
    enrollno = models.IntegerField(
        null=True
    )
    # Field Containing linkedin URL

    linkedin = models.URLField(
        max_length=1000,
        db_index=True,

        blank=True
    )

    position = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        choices=position_choices
    )

    vertical = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        choices=vertical_choices
    )

    branch = models.ForeignKey(
        branch,
        related_name="teams",
        on_delete=models.CASCADE,
    )

    year = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        choices=year_choices_team
    )
    mobile = models.IntegerField(
        null=True
    )
    email = models.CharField(
        default="",
        max_length=100,
    )


class CampusGroups(models.Model):
    group_name = models.CharField(
        max_length=300,
        default=""
    )

    def __str__(self):
        return self.group_name


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
        null=True,
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
        max_length=100,
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
    )

    email = models.CharField(
        default="",
        max_length=100,
    )


class BlogCategory(models.Model):
    category_name = models.CharField(
        max_length=100,
        default="",
        blank=True,
        null=True
    )

    def __str__(self):
        return self.category_name


class Blogs(models.Model):
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
        upload_to="blogs/",
        max_length=200,
        null=True,
        blank=True
    )
    is_featured = models.BooleanField(
        default=False,
    )
    is_featured = models.BooleanField(default=False,)
    category = models.ForeignKey(
        BlogCategory,
        related_name="blogs_category",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    content = tinymce_models.HTMLField()


class Events(models.Model):
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
        upload_to="events/",
        max_length=200,
        null=True,
        blank=True
    )
    venue = models.CharField(
        default="",
        max_length=100
    )
    venue = models.CharField(default="", max_length=100)
    content = tinymce_models.HTMLField()


class RaisedQuery(models.Model):
    name = models.CharField(default="", max_length=100)
    email = models.EmailField(max_length=254,)
    query = models.TextField()
