###############################################################################
# NAME:             api.py
#
# AUTHOR:           Ethan D. Twardy <edtwardy@mtu.edu>
#
# DESCRIPTION:      Implements a RESTful API for the application.
#
# CREATED:          06/24/2020
#
# LAST EDITED:      07/03/2020
###

from django.http import HttpRequest, HttpResponse, HttpResponseNotFound
from .models import Folder, Bookmark
from django.views.generic.base import View

import json

class FolderCollectionView(View):
    def post(self, request, *args, **kwargs):
        """Create a new folder"""
        data = json.loads(request.body)
        folder = Folder(name=data['name'])
        folder.save()
        data['id'] = folder.pk
        return HttpResponse(json.dumps(data), content_type='text/json')

    def get(self, request, *args, **kwargs):
        """Read the entire list of folders"""
        folders = []
        for dbObject in Folder.objects.all():
            folders.append({'name': dbObject.name})
        return HttpResponse(json.dumps(folders), content_type='text/json')

class BookmarkCollectionView(View):
    def post(self, request, *args, **kwargs):
        """Create a new bookmark"""
        data = json.loads(request.body)
        folder = Folder.objects.get(name=data['folder'])
        bookmark = Bookmark(pageTitle=data['pageTitle'],
                            pageLink=data['pageLink'], folder=folder)
        bookmark.save()
        data['id'] = bookmark.pk
        return HttpResponse(json.dumps(data), content_type='text/json')

class BookmarkView(View):
    def delete(self, request, *args, **kwargs):
        """Delete the bookmark with the given id"""
        try:
            bookmark = Bookmark.objects.get(pk=kwargs['bookmarkId'])
            bookmark.delete()
            return HttpResponse()
        except Bookmark.DoesNotExist:
            return HttpResponseNotFound()

###############################################################################
