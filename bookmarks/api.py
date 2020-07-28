###############################################################################
# NAME:             api.py
#
# AUTHOR:           Ethan D. Twardy <edtwardy@mtu.edu>
#
# DESCRIPTION:      Implements a RESTful API for the application.
#
# CREATED:          06/24/2020
#
# LAST EDITED:      07/28/2020
###

from django.http import HttpRequest, HttpResponse, HttpResponseNotFound
from .models import Folder, Bookmark
from django.views.generic.base import View
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import permission_required

import json

class FolderCollectionView(View):
    def post(self, request, *args, **kwargs):
        """Create a new folder"""
        data = json.loads(request.body)
        folder = Folder(name=data['name'])
        folder.save()
        data['id'] = folder.pk
        return HttpResponse(json.dumps(data), content_type='application/json')

    def get(self, request, *args, **kwargs):
        """Read the entire list of folders"""
        folders = []
        for dbObject in Folder.objects.all():
            folders.append({'name': dbObject.name})
        return HttpResponse(json.dumps(folders),
                            content_type='application/json')

class BookmarkCollectionView(View):
    def post(self, request, *args, **kwargs):
        """Create a new bookmark"""
        data = json.loads(request.body)
        folder = Folder.objects.get(name=data['folder'])
        bookmark = Bookmark(pageTitle=data['pageTitle'],
                            pageLink=data['pageLink'], folder=folder)
        bookmark.save()
        data['id'] = bookmark.pk
        return HttpResponse(json.dumps(data), content_type='application/json')

    def get(self, request, *args, **kwargs):
        """Read the entire set of bookmarks"""
        bookmarks = []
        for dbObject in Bookmark.objects.all():
            bookmarks.append({'id': dbObject.pk, 'pageLink': dbObject.pageLink,
                              'pageTitle': dbObject.pageTitle,
                              'folder': dbObject.folder.name})
        return HttpResponse(json.dumps(bookmarks),
                            content_type='application/json')

class BookmarkView(View):
    def delete(self, request, *args, **kwargs):
        """Delete the bookmark with the given id"""
        try:
            bookmark = Bookmark.objects.get(pk=kwargs['bookmarkId'])
            bookmark.delete()
            return HttpResponse()
        except Bookmark.DoesNotExist:
            return HttpResponseNotFound()

    def put(self, request, *args, **kwargs):
        """Update the selected bookmark with new attributes"""
        try:
            bookmark = Bookmark.objects.get(pk=kwargs['bookmarkId'])
            newData = json.loads(request.body)
            if 'pageTitle' in newData:
                bookmark.pageTitle = newData['pageTitle']
            if 'pageLink' in newData:
                bookmark.pageLink = newData['pageLink']
            try:
                bookmark.folder = Folder.objects.get(name=newData['folder'])
            except (KeyError, Folder.DoesNotExist):
                pass

            bookmark.save()
            return HttpResponse(json.dumps({
                'id': bookmark.pk,
                'pageLink': bookmark.pageLink,
                'pageTitle': bookmark.pageTitle,
                'folder': bookmark.folder.name,
            }), content_type='application/json')
        except Bookmark.DoesNotExist:
            return HttpResponseNotFound()

###############################################################################
# Protected Views
###

class ProtectedFolderCollectionView(FolderCollectionView):

    @method_decorator(permission_required, 'bookmarks.add_folder')
    def post(self, request, *args, **kwargs):
        """Create a new folder"""
        super().post(request, *args, **kwargs)

    @method_decorator(permission_required, 'bookmarks.view_folder')
    def get(self, request, *args, **kwargs):
        """Read the entire list of folders"""
        super().get(request, *args, **kwargs)

class ProtectedBookmarkCollectionView(BookmarkCollectionView):

    @method_decorator(permission_required, 'bookmarks.add_bookmark')
    def post(self, request, *args, **kwargs):
        """Create a new bookmark"""
        super().post(request, *args, **kwargs)

    @method_decorator(permission_required, 'bookmarks.view_bookmark')
    def get(self, request, *args, **kwargs):
        """Read the entire set of bookmarks"""
        super().get(request, *args, **kwargs)

class ProtectedBookmarkView(BookmarkView):

    @method_decorator(permission_required, 'bookmarks.delete_bookmark')
    def delete(self, request, *args, **kwargs):
        """Delete the bookmark with the given id"""
        super().delete(request, *args, **kwargs)

    @method_decorator(permission_required, 'bookmarks.change_bookmark')
    def put(self, request, *args, **kwargs):
        """Update the selected bookmark with new attributes"""
        super().put(request, *args, **kwargs)

###############################################################################
