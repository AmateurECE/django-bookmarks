from django.urls import path, re_path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'bookmarks', views.BookmarkViewSet)
router.register(r'folders', views.FolderViewSet)

urlpatterns = [
    path('list/', views.FolderListView.as_view(), name='list'),
    re_path(r'^list/(?P<display>cards?)', views.FolderListView.as_view(),
            name='index'),
    path('detail/<int:pk>', views.FolderDetailView.as_view(), name='detail'),
    re_path('detail/<int:pk>(?P<display>cards?)',
            views.FolderDetailView.as_view(), name='detail'),
    path('extension/', views.extension, name='extension'),
    path('api/', include(router.urls)),
]
