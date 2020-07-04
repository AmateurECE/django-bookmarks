///////////////////////////////////////////////////////////////////////////////
// NAME:            main.js
//
// AUTHOR:          Ethan D. Twardy <edtwardy@mtu.edu>
//
// DESCRIPTION:     Implements main functionality of the UI.
//
// CREATED:         07/03/2020
//
// LAST EDITED:     07/03/2020
////

const ui_bookmarkContainer = document.getElementById('bookmark-container');

ui_bookmarkContainer.addEventListener('mouseover', buttonToggleSelected);
ui_bookmarkContainer.addEventListener('mouseout', buttonToggleSelected);

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

///////////////////////////////////////////////////////////////////////////////
