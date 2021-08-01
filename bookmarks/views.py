from django.middleware import csrf
from django.http import HttpResponse
from django.views import generic
from django.conf import settings
from django.utils.module_loading import import_string
from rest_framework import viewsets
import json

from .models import Folder, Bookmark
from .serializers import BookmarkSerializer, FolderSerializer

AuthMixin = import_string(
    getattr(settings, 'BOOKMARKS_AUTH_MIXIN',
            'django.contrib.auth.mixins.UserPassesTestMixin')
)

class FolderDetailView(AuthMixin, generic.DetailView):
    model = Folder

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['display'] = self.request.GET.get('display', 'list')
        if context['display'] != 'cards' and context['display'] != 'list':
            context['display'] = 'list'
        return context

    def test_func(self):
        # If this is defined, we don't want to allow access
        return not hasattr(settings, 'BOOKMARKS_AUTH_MIXIN')

class FolderListView(AuthMixin, generic.ListView):
    model = Folder

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['display'] = self.request.GET.get('display', 'list')
        if context['display'] != 'cards' and context['display'] != 'list':
            context['display'] = 'list'
        return context

    def test_func(self):
        # If this is defined, we don't want to allow access
        return not hasattr(settings, 'BOOKMARKS_AUTH_MIXIN')

def extension(request):
    return HttpResponse(json.dumps({'token': csrf.get_token(request)}),
                        content_type='application/json')

###############################################################################
# Django REST Framework API Views
###

class BookmarkViewSet(viewsets.ModelViewSet):
    """API endpoint that allows bookmarks to be viewed or edited."""
    authentication_classes = getattr(settings, 'BOOKMARKS_AUTH_CLASSES', [])
    permission_classes = getattr(settings, 'BOOKMARKS_PERM_CLASSES', [])
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

class FolderViewSet(viewsets.ModelViewSet):
    """API endpoint that allows folders to be viewed or edited."""
    authentication_classes = getattr(settings, 'BOOKMARKS_AUTH_CLASSES', [])
    permission_classes = getattr(settings, 'BOOKMARKS_PERM_CLASSES', [])
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer

###############################################################################
