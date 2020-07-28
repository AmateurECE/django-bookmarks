///////////////////////////////////////////////////////////////////////////////
// NAME:            Bookmark.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     Implements logic for dealing with Bookmarks.
//
// CREATED:         07/03/2020
//
// LAST EDITED:     07/29/2020
////

export class Bookmark {
    static host = '';
    static path = '/bookmarks/api/bookmark/';

    constructor(parameters) {
        if (parameters.hasOwnProperty('url')
            && typeof(parameters.url) === 'string') {
            this.url = parameters.url;
        }

        if (parameters.hasOwnProperty('folder')
            && typeof(parameters.folder) === 'string') {
            this.folder = parameters.folder;
        }

        if (parameters.hasOwnProperty('pageLink')
            && typeof(parameters.pageLink) === 'string') {
            this.pageLink = parameters.pageLink;
        }

        if (parameters.hasOwnProperty('pageTitle')
            && typeof(parameters.pageTitle) === 'string') {
            this.pageTitle = parameters.pageTitle;
        }
    }

    update() { throw Error('Unimplemented method: update'); }

    async delete(csrfToken, apiKey) {
        if (!this.url) {
            throw new Error('Cannot delete a bookmark which wasn\'t'
                            + ' instantiated with a url. Call read() first '
                            + 'to obtain the url.');
        }
        const response = await fetch(this.url, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrfToken,
                'Authorization': `Token ${apiKey}`
            }
        });
    }
}

///////////////////////////////////////////////////////////////////////////////
