from django.db import models

# Create your models here.

class Folder(models.Model):
    name = models.CharField(max_length=16)

class Bookmark(models.Model):
    pageLink = models.CharField(max_length=512)
    pageTitle = models.CharField(max_length=128)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
