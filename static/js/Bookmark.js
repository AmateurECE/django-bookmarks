///////////////////////////////////////////////////////////////////////////////
// NAME:            Bookmark.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     Implements logic for dealing with Bookmarks.
//
// CREATED:         07/03/2020
//
// LAST EDITED:     07/04/2020
////

export class Bookmark {
    path = 'api/bookmark/';

    constructor(parameters) {
        if (parameters.hasOwnProperty('id')
            && typeof(parameters.id) === 'string') {
            this.id = parameters.id;
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

    create() { throw Error('Unimplemented method: create'); }

    read() { throw Error('Unimplemented method: read'); }

    update() { throw Error('Unimplemented method: update'); }

    async delete(token) {
        if (!this.id) {
            throw new Error('Cannot delete a bookmark which wasn\'t'
                            + ' instantiated with an id. Call read() first '
                            + 'to obtain the id.');
        }
        const response = await fetch(this.path + this.id + '/', {
            method: 'DELETE',
            headers: {'X-CSRFToken': token}
        });
    }
}

///////////////////////////////////////////////////////////////////////////////
