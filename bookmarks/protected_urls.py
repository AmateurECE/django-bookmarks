from django.urls import path, re_path

from . import views
from . import api

urlpatterns = [
    path('', views.ProtectedBookmarkListView.as_view(), name='index'),
    re_path(r'^(?P<display>cards?)', views.ProtectedBookmarkListView.as_view(),
            name='index'),
    path('extension/', views.extension, name='extension'),
    path('api/folders/', api.ProtectedFolderCollectionView.as_view(),
         name='api-folders'),
    path('api/bookmarks/', api.ProtectedBookmarkCollectionView.as_view(),
         name='api-bookmarks'),
    path('api/bookmark/<int:bookmarkId>/', api.ProtectedBookmarkView.as_view(),
         name='api-bookmark'),
]
