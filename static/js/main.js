///////////////////////////////////////////////////////////////////////////////
// NAME:            main.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     Implements main functionality of the UI.
//
// CREATED:         07/03/2020
//
// LAST EDITED:     07/04/2020
////

import { Bookmark } from './Bookmark.js';

const ui_bookmarkContainer = document.getElementById('bookmark-container');

ui_bookmarkContainer.addEventListener('mouseover', buttonToggleSelected);
ui_bookmarkContainer.addEventListener('mouseout', buttonToggleSelected);
ui_bookmarkContainer.addEventListener('click', deleteBookmark);

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

function deleteBookmark(event) {
    let deleteLink;
    if (event.target.classList.contains('delete')) {
        deleteLink = event.target;
    } else {
        return;
    }

    // We now have a reference to the top delete button.
    // Delete the bookmark containing this button.
    const ui_listItem = deleteLink.parentElement.parentElement.parentElement;

    // Confirm
    const pageTitle = ui_listItem.firstChild.textContent.trim();
    if (!confirmAction(`Delete "${pageTitle}"?`)) {
        return;
    }

    const bookmark = new Bookmark({
        // Extract the bookmark id from the element id.
        id: /bookmark-(\d*)/.exec(ui_listItem.id)[1]
    });

    // The CSRF Token is stored here.
    const token = ui_bookmarkContainer.firstElementChild.value;
    bookmark.delete(token);
    ui_listItem.remove();
}

///////////////////////////////////////////////////////////////////////////////
