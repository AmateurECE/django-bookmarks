# Generated by Django 3.2.3 on 2021-07-04 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookmarks', '0004_auto_20200728_2254'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookmark',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='folder',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]