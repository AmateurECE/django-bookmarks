///////////////////////////////////////////////////////////////////////////////
// NAME:            Folder.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     Implements functionality for dealing with folders.
//
// CREATED:         07/04/2020
//
// LAST EDITED:     07/04/2020
////

export class Folder {
    constructor(folder) {
        if (folder.hasOwnProperty('name') && folder.name) {
            this.name = folder.name;
        }

        if (folder.hasOwnProperty('id') && folder.id) {
            this.id = folder.id;
        }
    }

    update() { throw new Error('Unimplemented method: update'); }

    delete() { throw new Error('Unimplemented method: delete'); }
}

///////////////////////////////////////////////////////////////////////////////
