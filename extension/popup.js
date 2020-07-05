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
import { BookmarkCollection } from 'api/BookmarkCollection.js';

const hostName = 'http://localhost:8000/bookmarks/';
FolderCollection.host = hostName;
BookmarkCollection.host = hostName;

// Initialize the CSRF token
let csrfToken;
fetch(hostName + 'extension/', { method: 'GET' })
    .then(response => response.json())
    .then(data => csrfToken = data.token);

// On page load
document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.executeScript({
        code: `(${getPageInfo})()`
    }, ([result] = []) => {
        const titleField = document.getElementById('title'),
              linkField = document.getElementById('link');
        titleField.value = result.title;
        linkField.value = result.link;
    });

    populateFolders();
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

// submit button listener
// TODO: Read all the bookmarks on startup to figure out if this is one.
// TODO: Change button to 'delete' if the bookmark is existing
// TODO: Change button to 'update' if the bookmark is existing and changed
document.querySelector('.submit').addEventListener('click', (event) => {
    const select = document.getElementById('folder');
    BookmarkCollection.create({
        pageTitle: document.getElementById('title').value,
        pageLink: document.getElementById('link').value,
        folder: select.options[select.selectedIndex].text
    }, csrfToken);
    event.preventDefault();
});

///////////////////////////////////////////////////////////////////////////////
