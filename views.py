from django.shortcuts import render
from django.middleware import csrf
from django.http import HttpResponse
import json

from .models import Folder, Bookmark

# Create your views here.
def index(request):
    folderList = Folder.objects.order_by('name')
    context = {'folderList': None}
    if folderList:
        for folder in folderList:
            bookmarks = Bookmark.objects.filter(folder=folder)
            folder.bookmarks = bookmarks
        context = {'folderList': folderList}
    return render(request, 'index.html', context)

def extension(request):
    return HttpResponse(json.dumps({'token': csrf.get_token(request)}),
                        content_type='application/json')
