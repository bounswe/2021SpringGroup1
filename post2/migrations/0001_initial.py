# Generated by Django 3.2.3 on 2021-06-01 23:03

import builtins
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PostTemplate',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='Id')),
                ('name', models.CharField(max_length=50, verbose_name='Name')),
                ('description', models.TextField(max_length=builtins.max, verbose_name='Description')),
                ('data_field_temps', models.JSONField(default='{}', max_length=builtins.max, verbose_name='DataFieldTemps')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='Id')),
                ('posterid', models.IntegerField()),
                ('title', models.CharField(max_length=50, verbose_name='Title')),
                ('description', models.TextField(max_length=builtins.max, verbose_name='Description')),
                ('createdDate', models.DateTimeField(auto_now_add=True, verbose_name='Created Date')),
                ('dataFields', models.JSONField(default='{}', max_length=builtins.max, verbose_name='Data')),
                ('postTemplate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post2.posttemplate')),
            ],
        ),
        migrations.CreateModel(
            name='DataFieldTemp',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='Id')),
                ('name', models.CharField(max_length=50, verbose_name='Name')),
                ('type', models.CharField(max_length=50, verbose_name='Type')),
                ('form_content', models.JSONField(default='{}', max_length=builtins.max, verbose_name='Data')),
                ('postTemplate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post2.posttemplate')),
            ],
        ),
        migrations.CreateModel(
            name='DataField',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='Id')),
                ('name', models.CharField(max_length=50, verbose_name='Name')),
                ('type', models.CharField(max_length=50, verbose_name='Type')),
                ('content', models.JSONField(default='{}', max_length=builtins.max, verbose_name='Data')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post2.post')),
            ],
        ),
    ]