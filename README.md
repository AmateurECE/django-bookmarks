# Bookmark Collector

To utilize this Django application, add it to your `INSTALLED_APPS` in
`settings.py`:

```
INSTALLED_APPS = [
    ...
    'bookmarks.apps.BookmarksConfig',
    ...
]
```

And plug its urls into your project's `urls.py` file:

```
urlpatterns = [
    path('bookmarks/', include('bookmarks.urls')),
]
```

`MEDIA_URL` must be set in `settings.py`. The value does not matter. Additionally, so must `STATIC_ROOT`, `STATIC_URL` and `STATICFILES_DIRS`. Finally,
run `python3 manage.py makemigrations`, `python3 manage.py migrate` and
`python3 manage.py collectstatic` to update your local database and static
files, and you're off!
