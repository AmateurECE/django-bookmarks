# Bookmark Collector

To utilize this Django application, add it to your `INSTALLED_APPS` in
`settings.py`, along with its dependencies, the Django REST Framework and the
Django REST Framework `'authtoken'` app.

```
INSTALLED_APPS = [
    ...
    'bookmarks.apps.BookmarksConfig',
    'rest_framework',
    'rest_framework.authtoken',
    ...
]
```

And plug its urls into your project's `urls.py` file:

```
urlpatterns += [
    path('bookmarks/', include('bookmarks.urls')),
]
```

Or to utilize the protected urls, which require a logged in user with the
permissions `bookmarks.(view|change|add|delete)_(folder|bookmarks)` (depending
on which urls are accessed):

```
urlpatterns += [
    path('bookmarks/', include('bookmarks.protected_urls')),
]
```

`MEDIA_URL` must be set in `settings.py`. The value does not matter. Additionally, so must `STATIC_ROOT`, `STATIC_URL` and `STATICFILES_DIRS`. Finally,
run `python3 manage.py makemigrations`, `python3 manage.py migrate` and
`python3 manage.py collectstatic` to update your local database and static
files, and you're off!
