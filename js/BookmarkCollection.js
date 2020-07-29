///////////////////////////////////////////////////////////////////////////////
// NAME:            BookmarkCollection.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     Implements logic for dealing with the whole collection.
//
// CREATED:         07/04/2020
//
// LAST EDITED:     07/29/2020
////

import { Bookmark } from 'api/Bookmark.js';
import { Ajax } from 'api/Ajax.js';

export class BookmarkCollection {
    static host = '';
    static path = '/bookmarks/api/bookmarks/';

    static async create(bookmark, csrfToken, apiKey=undefined) {
        if (!bookmark.hasOwnProperty('pageTitle') || !bookmark.pageTitle ||
            !bookmark.hasOwnProperty('pageLink') || !bookmark.pageLink ||
            !bookmark.hasOwnProperty('folder')|| !bookmark.folder) {
            throw new Error('Cannot create a bookmark without the three '
                            + 'parameters pageTitle, pageLink, folder');
        }

        const response = await Ajax.post(
            BookmarkCollection.host + BookmarkCollection.path,
            csrfToken, apiKey,
            JSON.stringify({
                pageTitle: bookmark.pageTitle, pageLink: bookmark.pageLink,
                folder: bookmark.folder})
            );

        bookmark.url = response.url;
        return new Bookmark(bookmark);
    }

    static async read(apiKey=undefined) {
        const response = await Ajax.get(
            BookmarkCollection.host + BookmarkCollection.path,
            'GET', apiKey);

        let bookmarks = [];
        response.forEach((element) => {
            bookmarks.push(new Bookmark(element));
        });
        return bookmarks;
    }
}

///////////////////////////////////////////////////////////////////////////////
