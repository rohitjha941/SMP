# Generated by Django 2.1.7 on 2020-10-16 12:45

import common.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentors', '0007_auto_20200524_2342'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mentorapplication',
            name='mobile',
            field=models.CharField(blank=True, max_length=10, null=True, unique=True, validators=[
                                   common.validators.validate_mobile]),
        ),
    ]
