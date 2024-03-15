// The purpose of this script is to be attached to websites and then generate DOM elements based on existing classes

document.addEventListener('DOMContentLoaded', initialize, false);

function initialize() {
    // init stuff goes here
    // window.alert("Yeah!");
    imagehref();
}

/*
add functions here for generating:
 - header div
 - footer div
 - other divs that require multiple child DOMs
*/


/** 
 * @function findElementWithAttribute
 * @description Finds all elements using the name of the attribute as a search feature
 * @param {String} attributeName The name of the attribute.
 * @returns A list of all elements with the attribute name
*/
function findElementWithAttribute(attributeName){
    // assuming attributeName is a String
    let out = [];

    document.querySelectorAll('*').forEach(function(node) {
        if (node.getAttribute(attributeName) != null){
            out.push(node);
        }
    });

    return out;
}

function populateHeader() {
    /*
    how this function is supposed to work:
    1. this function finds an empty div with class "header"
    2. if found, set the inner HTML to the constant that is provided above (will add later)
    3. depending on the page, make one of the buttons depressed :(
        (for example, on "Learn" page, make the "learn" button gray instead of white)
    */
}

// Redirects to a sign in page
function redirectToSignIn(){
    window.location.replace("userAuth.html");
}

// data functions (aka, functions specifically for custom attributes, those that start with "data-")

function imagehref() {
    // TODO: get table of all elements with data-imagehref and then set their background images to the image
    let tab = findElementWithAttribute("data-imagehref")
    tab.forEach(function(htmlElement){
        htmlElement.style.backgroundImage = "url('" + htmlElement.getAttribute("data-imagehref") + "')";
        htmlElement.style.backgroundRepeat = "no-repeat";
        htmlElement.style.backgroundPosition = "center";

        let temp = document.createElement("img")

        //todo finish this
        htmlElement.style.backgroundSize = "100vw 100vw";
    });
}