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

import { Ajax } from './Ajax.js';

export class Bookmark {
    static host = '';
    static path = '/bookmarks/api/bookmark/';

    setPropertyIfExists(parameters, propertyName) {
        if (parameters.hasOwnProperty(propertyName)
            && typeof(parameters[propertyName] === 'string')) {
            this[propertyName] = parameters[propertyName];
        }
    }

    constructor(parameters) {
        this.setPropertyIfExists(parameters, 'url');
        this.setPropertyIfExists(parameters, 'folder');
        this.setPropertyIfExists(parameters, 'pageLink');
        this.setPropertyIfExists(parameters, 'pageTitle');
    }

    update() { throw Error('Unimplemented method: update'); }

    async delete(csrfToken, apiKey=undefined) {
        if (!this.url) {
            throw new Error('Cannot delete a bookmark which wasn\'t'
                            + ' instantiated with a url. Call read() first '
                            + 'to obtain the url.');
        }
        await Ajax.delete(this.url, csrfToken, apiKey);
    }
}

///////////////////////////////////////////////////////////////////////////////
