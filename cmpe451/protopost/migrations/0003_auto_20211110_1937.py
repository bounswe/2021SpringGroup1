# Generated by Django 3.2.9 on 2021-11-10 19:37

import builtins
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('protopost', '0002_auto_20211110_0754'),
    ]

    operations = [
        migrations.AlterField(
            model_name='community',
            name='name',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='datafieldtemp',
            name='form_content',
            field=models.JSONField(blank=True, max_length=builtins.max, null=True, verbose_name='Data'),
        ),
    ]