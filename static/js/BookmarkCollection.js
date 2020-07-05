///////////////////////////////////////////////////////////////////////////////
// NAME:            BookmarkCollection.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     Implements logic for dealing with the whole collection.
//
// CREATED:         07/04/2020
//
// LAST EDITED:     07/04/2020
////

import { Bookmark } from 'api/Bookmark.js';

export class BookmarkCollection {
    static host = '';
    static path = 'api/bookmarks/';

    static async create(bookmark, token) {
        if (!bookmark.hasOwnProperty('pageTitle') || !bookmark.pageTitle ||
            !bookmark.hasOwnProperty('pageLink') || !bookmark.pageLink ||
            !bookmark.hasOwnProperty('folder')|| !bookmark.folder) {
            throw new Error('Cannot create a bookmark without the three '
                            + 'parameters pageTitle, pageLink, folder');
        }

        const response = await fetch(
            BookmarkCollection.host + BookmarkCollection.path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': token},
                body: JSON.stringify({
                    pageTitle: bookmark.pageTitle, pageLink: bookmark.pageLink,
                    folder: bookmark.folder})
            });

        if (!response.ok) {
            bookmark.id = await response.json().id;
            return new Bookmark(bookmark);
        }

        throw new Error('POST request failed');
    }

    static async read() { throw new Error('Unimplemented method: read'); }
}

///////////////////////////////////////////////////////////////////////////////
