from django.db import models

# Create your models here.

class Folder(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=16)

    class Meta:
        ordering = ['name']

class Bookmark(models.Model):
    id = models.AutoField(primary_key=True)
    pageLink = models.CharField(max_length=512)
    pageTitle = models.CharField(max_length=128)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    thumbnail = models.ImageField(upload_to='bookmarks/thumbnails',
                                  default='blank.svg')
