# Documentation for the RESTful API

This API implements the standard CRUD operations.

## Create
### Creating A Folder
```
POST /api/folders/
{
  "name": "RESTful Documentation"
}
```

Response:

```
{
  "id": "<theNewFolderPrimaryKey>",
  "name": "<theFolderName>"
}
```

### Creating A Bookmark
```
POST /api/bookmarks/
{
  "pageLink": "https://github.com/AmateurECE",
  "pageTitle": "AmateurECE's GitHub Profile",
  "folder": "GitHub"
}
```

Response:

```
{
  "id": "<theNewFolderPrimaryKey>",
  "pageLink": "https://github.com/AmateurECE",
  "pageTitle": "AmateurECE's GitHub Profile",
  "folder": "GitHub"
}
```

## Read
### Reading A Single Bookmark
```
GET /api/bookmark/<bookmarkId>
```

Response:

```
{
  "id": "<theBookmarkPrimaryKey>",
  "pageLink": "<thePageLink>",
  "pageTitle": "<thePageTitle>",
  "folder": "<theFolderName>"
}
```

### Reading Bulk Folders
```
GET /api/folders/
```

Response:

```
[
  {
    "id": "<theFolderPrimaryKey>",
    "name": "<theFolderName>"
  }
  ...
]
```

### Reading Bulk Bookmarks
```
GET /api/bookmarks/
```

Response:

```
[
  {
    "id": "<theBookmarkPrimaryKey>",
    "pageLink": "<thePageLink>",
    "pageTitle": "<thePageTitle>",
    "folder": "<theFolderName>"
  }
  ...
]
```

## Update
### Updating A Folder
```
PUT /api/bookmark/<folderId>
{
  "id": "<theFolderPrimaryKey>",
  "name": "<theFolderNewName>"
}
```

### Updating A Bookmark
```
PUT /api/bookmark/<bookmarkId>
{
  "id": "<theBookmarkPrimaryKey>",
  "pageLink": "<theNewPageLink>",
  "pageTitle": "<theNewPageTitle>",
  "folder": "<theNewFolderName>"
}
```

## Delete
### Deleting A Folder
```
DELETE /api/folder/<folderId>
```

### Deleting A Bookmark
```
DELETE /api/bookmark/<bookmarkId>
```
