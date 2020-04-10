# Generated by Django 2.1.7 on 2020-04-08 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0021_auto_20200408_1446'),
    ]

    operations = [
        migrations.CreateModel(
            name='CampusGroups',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_name', models.CharField(default='', max_length=300)),
            ],
        ),
        migrations.AddField(
            model_name='mentor',
            name='groups',
            field=models.ManyToManyField(blank=True, related_name='campus_groups_mentor', to='pages.CampusGroups'),
        ),
    ]