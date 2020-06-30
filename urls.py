from django.urls import path

from . import views
from .api import BookmarkCollectionView, FolderCollectionView

urlpatterns = [
    path('', views.index, name='index'),
    path('api/folders/', FolderCollectionView.as_view(), name='api-folders'),
    path('api/bookmarks/', BookmarkCollectionView.as_view(),
         name='api-bookmarks')
]
