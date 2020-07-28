///////////////////////////////////////////////////////////////////////////////
// NAME:            main.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     Implements main functionality of the UI.
//
// CREATED:         07/03/2020
//
// LAST EDITED:     07/28/2020
////

import { Bookmark } from './Bookmark.js';
import { FolderCollection } from './FolderCollection.js';
import { Folder } from './Folder.js';

const ui_bookmarkContainer = document.getElementById('bookmark-container');
ui_bookmarkContainer.addEventListener('mouseover', buttonToggleSelected);
ui_bookmarkContainer.addEventListener('mouseout', buttonToggleSelected);
ui_bookmarkContainer.addEventListener('click', deleteBookmark);

newFolderFormSetup();

function buttonToggleSelected(event) {
    let deleteLink;
    if (event.target.classList.contains('delete')) {
        deleteLink = event.target;
    } else {
        return;
    }

    // We now have a reference to the top delete button.
    // Transition the bottom one by toggling the 'selected' class.
    deleteLink.previousElementSibling.classList.toggle('selected');
}

function confirmAction(message) {
    // TODO: Implement a more aesthetically pleasing confirmation prompt.
    return confirm(message);
}

function getToken() {
    // The CSRF Token is stored here.
    return ui_bookmarkContainer.firstElementChild.value;
}

function deleteBookmark(event) {
    let deleteLink;
    if (event.target.classList.contains('delete')) {
        deleteLink = event.target;
    } else {
        return;
    }

    // We now have a reference to the top delete button.
    // Delete the bookmark containing this button.
    let ui_listItem = deleteLink.parentElement.parentElement.parentElement;
    let pageTitle = ui_listItem.firstChild.textContent.trim();
    if (!ui_listItem.id.includes('bookmark')) {
        ui_listItem = ui_listItem.parentElement;
        pageTitle = deleteLink.parentElement.parentElement
            .previousElementSibling.textContent.trim();
    }

    // Confirm
    if (!confirmAction(`Delete "${pageTitle}"?`)) {
        return;
    }

    const bookmark = new Bookmark({
        // Extract the bookmark id from the element id.
        // TODO: Make this url part of the DOM, some how.
        url: '/bookmarks/api/bookmarks/'
            + /bookmark-(\d*)/.exec(ui_listItem.id)[1] + '/'
    });

    bookmark.delete(getToken());
    ui_listItem.remove();
}

function addFolder(folder) {
    // Append to the navigator
    const ui_folderNavigator = document.getElementById('folder-list');
    const newFolderNavigator = document.createElement('a');
    newFolderNavigator.classList.add('nav-link', 'active');

    const folderName = folder.name.toString();
    newFolderNavigator.setAttribute(
        'href', `#folder-${folderName.toLowerCase()}`);
    newFolderNavigator.appendChild(document.createTextNode(folderName));
    // TODO: Insert in lexicographical order
    ui_folderNavigator.appendChild(newFolderNavigator);

    // TODO: Append to the list
}

function newFolderFormSetup() {
    const ui_newFolderForm = document.getElementById('new-folder-form');

    const ui_newFolderButton = document.getElementById('new-folder-button');
    ui_newFolderButton.addEventListener('click', (event) => {
        // Turn on the overlay
        const overlay = document.querySelector('.form-overlay');
        overlay.style.visibility = 'visible';

        // Show the addFolder form
        ui_newFolderForm.style.display = 'block';

        // Focus the input
        document.querySelector('#new-folder-form input').focus();
    });

    const unfocusForm = () => {
        // Turn off the overlay
        const overlay = document.querySelector('.form-overlay');
        overlay.style.visibility = 'hidden';

        // Hide the addFolder form
        ui_newFolderForm.style.display = 'none';

        // Unfocus the input
        document.querySelector('#new-folder-form input').blur();
    };

    const okay = document.querySelector('#new-folder-form .okay');
    okay.addEventListener('click', (e) => {
        unfocusForm();

        // Request to the server that we add this folder.
        new Promise((resolve, reject) => {
            const folder = FolderCollection.create({
                name: document.querySelector('#new-folder-form input').value
            }, getToken());
            resolve(folder);
        }).then(addFolder);

        e.preventDefault();
    });

    const cancel = document.querySelector('#new-folder-form .cancel');
    cancel.addEventListener('click', (e) => {
        unfocusForm();

        // Clear the input
        document.querySelector('#new-folder-form input').value = '';
        e.preventDefault();
    });
}

///////////////////////////////////////////////////////////////////////////////
