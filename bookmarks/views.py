from django.shortcuts import render
from django.middleware import csrf
from django.http import HttpResponse
from django.views import generic
from django.contrib.auth.mixins import PermissionRequiredMixin
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import json

from .models import Folder, Bookmark
from .serializers import BookmarkSerializer, FolderSerializer

# Create your views here.
class BookmarkListView(generic.ListView):
    model = Folder

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if 'display' in self.kwargs:
            context['display'] = self.kwargs['display']
        else:
            context['display'] = 'list'
        return context

def extension(request):
    return HttpResponse(json.dumps({'token': csrf.get_token(request)}),
                        content_type='application/json')

###############################################################################
# Django REST Framework API Views
###

class BookmarkViewSet(viewsets.ModelViewSet):
    """API endpoint that allows bookmarks to be viewed or edited."""
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

class FolderViewSet(viewsets.ModelViewSet):
    """API endpoint that allows folders to be viewed or edited."""
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer

###############################################################################
# Protected Views
###

class ProtectedBookmarkListView(PermissionRequiredMixin, BookmarkListView):
    permission_required = 'bookmarks.view_bookmark'

class ProtectedBookmarkViewSet(BookmarkViewSet):
    """API endpoint that allows bookmarks to be viewed or edited."""
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class ProtectedFolderViewSet(FolderViewSet):
    """API endpoint that allows folders to be viewed or edited."""
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
