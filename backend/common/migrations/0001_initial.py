# Generated by Django 2.1.7 on 2021-02-13 13:34

import common.validators
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('branch_name', models.CharField(default='', max_length=100)),
            ],
            options={
                'verbose_name_plural': 'Branches',
            },
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=1000, null=True)),
                ('email', models.EmailField(default='', max_length=200,
                                            unique=True, validators=[common.validators.validate_iitr_email])),
                ('enroll_no', models.IntegerField(unique=True,
                                                  validators=[common.validators.validate_enroll])),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                             related_name='student_branch', to='common.Branch')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE,
                                              related_name='student_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
