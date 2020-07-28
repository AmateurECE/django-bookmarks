# Bookmark Collector

To utilize this Django application, add it to your `INSTALLED_APPS` in
`settings.py`:

```
INSTALLED_APPS = [
    ...
    'django-bookmarks',
    ...
]
```

And plug its urls into your project's `urls.py` file:

```
urlpatterns = [
    path('bookmarks/', include('django-bookmarks.urls')),
]
```

`MEDIA_URL` must be set in `settings.py`. The value does not matter. Finally,
run `python3 manage.py makemigrations` and `python3 manage.py migrate` to
update your local database, and you're off!
