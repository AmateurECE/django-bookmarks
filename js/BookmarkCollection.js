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

export class BookmarkCollection {
    static host = '';
    static path = '/bookmarks/api/bookmarks/';

    static async create(bookmark, csrfToken, apiKey) {
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
                    'X-CSRFToken': csrfToken,
                    'Authorization': `Token ${apiKey}`},
                body: JSON.stringify({
                    pageTitle: bookmark.pageTitle, pageLink: bookmark.pageLink,
                    folder: bookmark.folder})
            });

        if (response.ok) {
            bookmark.url = (await response.json()).url;
            return new Bookmark(bookmark);
        }

        throw new Error('POST request failed');
    }

    static async read(apiKey) {
        const response = await fetch(
            BookmarkCollection.host + BookmarkCollection.path, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Token ${apiKey}`
                }
            });

        if (response.ok) {
            const responseData = await response.json();

            let bookmarks = [];
            responseData.forEach((element) => {
                bookmarks.push(new Bookmark(element));
            });

            return bookmarks;
        }

        throw new Error('Could not read bookmarks from the server');
    }
}

///////////////////////////////////////////////////////////////////////////////
