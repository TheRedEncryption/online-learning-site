// The purpose of this script is to be attached to websites and then generate DOM elements based on existing classes

document.addEventListener('DOMContentLoaded', initialize, false);

function initialize() {
    // init stuff goes here
    // window.alert("Yeah!");
    imagehref();
    fontSize();
    replaceTemplates();
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

function replaceTemplates(){
    var templates = document.getElementsByTagName("temp-late");
    $(function(){
        $("header-template").load("./templates/header-template.html"); 
    });
}

// Redirects to a sign in page
function redirectToSignIn(){
    window.location.replace("userAuth.html");
}

// data functions (aka, functions specifically for custom attributes, those that start with "data-")

function getSize(url, cb) {
    const img = new Image();
    img.src = url;
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
}

function imagehref() {
    let tab = findElementWithAttribute("data-imagehref")
    tab.forEach(function(htmlElement){

        let data = htmlElement.getAttribute("data-imagehref");
        let dimension = htmlElement.getAttribute("data-prioritize-dimension"); // make this work lol
        let ignore = htmlElement.getAttribute("data-ignore-rescale")

        if (dimension == null) {
            dimension = "width";
        }

        htmlElement.style.backgroundImage = "url('" + data + "')";
        htmlElement.style.backgroundRepeat = "no-repeat";
        htmlElement.style.backgroundPosition = "center";

        var width = 1;
        var height = 2;

        getSize(data, (err, img) => {
            width = img.naturalWidth;
            height = img.naturalHeight;

            if(ignore != "true"){
                let aspectRatio = width / height;

                let properHeight = 100 / aspectRatio;
                
                htmlElement.style.backgroundSize = "100vw " + properHeight + "vw";
            }
        });

    });
}

function fontSize(){

    let tab = findElementWithAttribute("data-fontsize")

    tab.forEach(function(htmlElement){
        
        let data = htmlElement.getAttribute("data-fontsize")
        htmlElement.style.fontSize = data + "px";

    });

}