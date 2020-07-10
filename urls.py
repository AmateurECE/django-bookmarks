from django.urls import path, re_path

from . import views
from . import api

urlpatterns = [
    path('', views.index, name='index'),
    re_path(r'^(?P<display>cards?)', views.index, name='index'),
    path('extension/', views.extension, name='extension'),
    path('api/folders/', api.FolderCollectionView.as_view(),
         name='api-folders'),
    path('api/bookmarks/', api.BookmarkCollectionView.as_view(),
         name='api-bookmarks'),
    path('api/bookmark/<int:bookmarkId>/', api.BookmarkView.as_view(),
         name='api-bookmark'),
]
