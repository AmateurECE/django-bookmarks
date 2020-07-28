from django.shortcuts import render
from django.middleware import csrf
from django.http import HttpResponse
from django.views import generic
from django.contrib.auth.mixins import PermissionRequiredMixin
import json

from .models import Folder, Bookmark

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
# Protected Views
###

class ProtectedBookmarkListView(PermissionRequiredMixin, BookmarkListView):
    permission_required = 'bookmarks.view_bookmark'
