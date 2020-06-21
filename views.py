from django.shortcuts import render

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
    return render(request, 'bookmarks/index.html', context)
