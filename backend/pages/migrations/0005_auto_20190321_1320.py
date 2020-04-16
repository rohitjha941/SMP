# Generated by Django 2.1.7 on 2019-03-21 13:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("pages", "0004_contactdetails"),
    ]

    operations = [
        migrations.RemoveField(model_name="mentor", name="year",),
        migrations.AlterField(
            model_name="mentor",
            name="branch",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="mentors",
                to="pages.branch",
            ),
        ),
    ]
