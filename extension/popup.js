///////////////////////////////////////////////////////////////////////////////
// NAME:            popup.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     User Interface code for the popup.
//
// CREATED:         07/03/2020
//
// LAST EDITED:     07/10/2020
////

import { FolderCollection } from 'api/FolderCollection.js';
import { BookmarkCollection } from 'api/BookmarkCollection.js';
import { Bookmark } from 'api/Bookmark.js';

const hostName = 'http://localhost:8000';
FolderCollection.host = hostName;
BookmarkCollection.host = hostName;
Bookmark.host = hostName;

// Initialize the CSRF token
let csrfToken;
fetch(hostName + '/bookmarks/extension/', { method: 'GET' })
    .then(response => response.json())
    .then(data => csrfToken = data.token);

// Datum for bookmark delete button. Set if this is a bookmark already
let bookmarkId;

// On page load
document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.executeScript({
        code: `(${getPageInfo})()`
    }, ([result] = []) => {

        // Pre-populate the title and link fields with data from the page
        const titleField = document.getElementById('title'),
              linkField = document.getElementById('link');
        titleField.value = result.title;
        linkField.value = result.link;

        // Determine if this already is a bookmark
        const submitButton = document.querySelector('.submit');
        BookmarkCollection.read().then(data => {
            data.forEach(element => {
                if (element.pageLink == result.link) {
                    submitButton.innerHTML = 'Delete';
                    bookmarkId = element.id;
                }
            });
        });
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
// TODO: Change button to 'update' if the bookmark is existing and changed
document.querySelector('.submit').addEventListener('click', (event) => {
    if (event.target.innerHTML === 'Create') {
        createBookmark();
        event.target.innerHTML = 'Delete';
    } else if (event.target.innerHTML === 'Delete') {
        deleteBookmark();
        event.target.innerHTML = 'Create';
    }
    event.preventDefault();
});

function createBookmark() {
    const select = document.getElementById('folder');
    BookmarkCollection.create({
        pageTitle: document.getElementById('title').value,
        pageLink: document.getElementById('link').value,
        folder: select.options[select.selectedIndex].text
    }, csrfToken).then(bookmark => {
        bookmarkId = bookmark.id;
    });
}

function deleteBookmark() {
    const bookmark = new Bookmark({id: bookmarkId});
    bookmark.delete(csrfToken);
}

///////////////////////////////////////////////////////////////////////////////
