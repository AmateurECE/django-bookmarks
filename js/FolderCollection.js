///////////////////////////////////////////////////////////////////////////////
// NAME:            FolderCollection.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     Implements logic for dealing with the folder collection.
//
// CREATED:         07/04/2020
//
// LAST EDITED:     07/29/2020
////

import { Folder } from './Folder.js';
import { Ajax } from './Ajax.js';

export class FolderCollection {
    static host = '';
    static path = '/bookmarks/api/folders/';

    static async create(folder, csrfToken, apiKey=undefined) {
        if (!folder.hasOwnProperty('name') || !folder.name) {
            throw new Error('Cannot create a folder without a name');
        }

        const response = await Ajax.post(
            FolderCollection.host + FolderCollection.path,
            csrfToken, apiKey,
            JSON.stringify({name: folder.name})
        );

        return new Folder({url: response.url, name: response.name});
    }

    static async read(apiKey=undefined) {
        const response = await Ajax.get(
            FolderCollection.host + FolderCollection.path, apiKey
        );

        let folders = [];
        response.forEach((element) => {
            folders.push(new Folder(element));
        });

        return folders;
    }
}

///////////////////////////////////////////////////////////////////////////////
