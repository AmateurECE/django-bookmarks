///////////////////////////////////////////////////////////////////////////////
// NAME:            popup.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     User Interface code for the popup.
//
// CREATED:         07/03/2020
//
// LAST EDITED:     07/04/2020
////

import { FolderCollection } from 'api/FolderCollection.js';

FolderCollection.host = 'http://localhost:8000/bookmarks/';

document.addEventListener('DOMContentLoaded', () => {
    populateFolders().then(() => {
        chrome.tabs.executeScript({
            code: `(${getPageInfo})()`
        }, ([result] = []) => {
            const titleField = document.getElementById('title'),
                  linkField = document.getElementById('link');
            titleField.value = result.title;
            linkField.value = result.link;
        });
    });
});

function getPageInfo() {
    return {title: document.title, link: document.URL};
}

async function populateFolders() {
    const errorBanner = document.querySelector('.error-banner');

    try {
        const folders = await FolderCollection.read();
        const select = document.getElementById('folder');
        folders.forEach((element) => {
            const option = document.createElement('option');
            option.value = element.name;
            option.innerText = element.name;
            select.appendChild(option);
        });
    } catch(erorr) {
        errorBanner.innerHTML = `Could not connect to `
            + `${FolderCollection.host}. Is it running?`;
        errorBanner.style.display = 'block';
        return;
    }
}

///////////////////////////////////////////////////////////////////////////////
