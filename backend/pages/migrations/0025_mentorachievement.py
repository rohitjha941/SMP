# Generated by Django 2.1.7 on 2020-04-10 14:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0024_merge_20200410_1249'),
    ]

    operations = [
        migrations.CreateModel(
            name='MentorAchievement',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('achievement_name', models.CharField(
                    blank=True, max_length=100, null=True)),
                ('mentor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                             related_name='mentor_achievement', to='pages.Mentor')),
            ],
        ),
    ]