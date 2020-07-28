from django.urls import path, re_path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'bookmarks', views.ProtectedBookmarkViewSet)
router.register(r'folders', views.ProtectedFolderViewSet)

urlpatterns = [
    path('', views.ProtectedBookmarkListView.as_view(), name='index'),
    re_path(r'^(?P<display>cards?)', views.ProtectedBookmarkListView.as_view(),
            name='index'),
    path('extension/', views.extension, name='extension'),
    path('api/', include(router.urls)),
]
