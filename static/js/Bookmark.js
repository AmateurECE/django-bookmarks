///////////////////////////////////////////////////////////////////////////////
// NAME:            Bookmark.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     Implements logic for dealing with Bookmarks.
//
// CREATED:         07/03/2020
//
// LAST EDITED:     07/06/2020
////

export class Bookmark {
    static host = '';
    static path = 'api/bookmark/';

    constructor(parameters) {
        if (parameters.hasOwnProperty('id')
            && typeof(parameters.id) === 'number') {
            this.id = parameters.id;
        } else if (parameters.hasOwnProperty('id')
                   && typeof(parameters.id) === 'string') {
            this.id = parseInt(parameters.id);
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

    async delete(token) {
        if (!this.id) {
            throw new Error('Cannot delete a bookmark which wasn\'t'
                            + ' instantiated with an id. Call read() first '
                            + 'to obtain the id.');
        }
        const response = await fetch(
            Bookmark.host + Bookmark.path + this.id + '/', {
                method: 'DELETE',
                headers: {'X-CSRFToken': token}
            });
    }
}

///////////////////////////////////////////////////////////////////////////////
