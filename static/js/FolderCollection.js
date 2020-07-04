///////////////////////////////////////////////////////////////////////////////
// NAME:            FolderCollection.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     Implements logic for dealing with the folder collection.
//
// CREATED:         07/04/2020
//
// LAST EDITED:     07/04/2020
////

import { Folder } from './Folder.js';

export class FolderCollection {
    static path = 'api/folders/';

    static async create(folder, token) {
        if (!folder.hasOwnProperty('name') || !folder.name) {
            throw new Error('Cannot create a folder without a name');
        }

        const response = await fetch(FolderCollection.path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': token},
            body: JSON.stringify({name: folder.name})
        });

        if (response.ok) {
            const data = await response.json();
            return new Folder({id: data.id, name: data.name});
        }

        // Should be unreachable
        throw new Error('Failed to create folder');
    }

    static async read(folder) {
        const response = await fetch(FolderCollection.path, {
            method: 'GET'
        });

        if (response.ok) {
            const responseData = await response.json();

            let folders = [];
            responseData.forEach((element) => {
                folders.push(new Folder(element));
            });

            return folders;
        }

        // Should be unreachable
        throw new Error('Failed to read the folders');
    }
}

///////////////////////////////////////////////////////////////////////////////
