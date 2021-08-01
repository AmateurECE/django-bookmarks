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

To protect the urls, set the following variables in `settings.py`:

```
# Values provided are the tested default. Set them how you like!
BOOKMARKS_AUTH_CLASSES = [SessionAuthentication]
BOOKMARKS_PERM_CLASSES = [IsAuthenticated]
BOOKMARKS_AUTH_MIXIN = 'django.contrib.auth.mixins.LoginRequiredMixin'
```

`MEDIA_URL` must be set in `settings.py`. The value does not matter. Additionally, so must `STATIC_ROOT`, `STATIC_URL` and `STATICFILES_DIRS`. Finally,
run `python3 manage.py makemigrations`, `python3 manage.py migrate` and
`python3 manage.py collectstatic` to update your local database and static
files, and you're off!

## Template Hierarchy

In the simple diagram below, a branch with `----` indicates derivation, while
a branch with `+---` indicates composition by the parent.

```
application_base.html
|----folder_list.html
|    |+---display_cards.html
|    |+---display_list.html
|----folder_detail.html
     |+---display_cards.html
     |+---display_list.html
```
