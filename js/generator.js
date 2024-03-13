// The purpose of this script is to be attached to websites and then generate DOM elements based on existing classes

document.addEventListener('DOMContentLoaded', initialize, false);

function initialize() {
    // init stuff goes here
    // window.alert("Yeah!");
}

/*
add functions here for generating:
 - header div
 - footer div
 - other divs that require multiple child DOMs
*/

function populateHeader() {
    /*
    how this function is supposed to work:
    1. this function finds an empty div with class "header"
    2. if found, set the inner HTML to the constant that is provided above (will add later)
    3. depending on the page, make one of the buttons depressed :(
        (for example, on "Learn" page, make the "learn" button gray instead of white)
    */
}

// data functions (aka, functions specifically for custom attributes, those that start with "data-")

function imagehref() {
    // TODO: get table of all elements with data-imagehref and then set their background images to the image
}