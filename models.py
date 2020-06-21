from django.db import models

# Create your models here.

class Bookmark(models.Model):
    pageLink = models.CharField(max_length=512)
    pageTitle = models.CharField(max_length=128)
