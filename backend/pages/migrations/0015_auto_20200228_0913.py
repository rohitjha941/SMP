# Generated by Django 2.1.7 on 2020-02-28 09:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0014_auto_20200228_0853'),
    ]

    operations = [
        migrations.RenameField(
            model_name='mentordocs',
            old_name='mentorsGuide',
            new_name='document',
        ),
    ]