// The purpose of this script is to be attached to websites and then generate DOM elements based on existing classes

document.addEventListener('DOMContentLoaded', initialize, false);

document.addEventListener('templatesLoaded', postTemplates, false);

document.addEventListener('authChanged', loadProfilePicture, false);

const templatesLoaded = new Event("templatesLoaded");

function initialize() {
    // init stuff goes here
    imagehref();
    replaceTemplates();
    favicon();
    fontSize();
}

/** 
 * @function findElementWithAttribute
 * @description Finds all elements using the name of the attribute as a search feature
 * @param {String} attributeName The name of the attribute.
 * @returns A list of all elements with the attribute name
*/
function findElementWithAttribute(attributeName) {
    // assuming attributeName is a String
    let out = [];

    document.querySelectorAll('*').forEach(function (node) {
        if (node.getAttribute(attributeName) != null) {
            out.push(node);
        }
    });

    return out;
}

function replaceTemplates() {

    $(function () {
        // SET BACK TO ./templates/header-template.html TO TEST USING FIVE SERVER
        $("header-template").load("/online-learning-site/templates/header-template.html");
        // $("course-holder-template").load("./templates/course-holder-template.html");
        $("footer-template").load("/online-learning-site/templates/footer-template.html", onLoadEndJQuery);
    });
    // is this even sensible? mi i scared... :fearful:
    function onLoadEndJQuery() {
        document.dispatchEvent(templatesLoaded);
    }
}

function postTemplates() {
    loadProfilePicture();
}

function loadProfilePicture() {
    var profPic = document.getElementById('user-profile-image');
    var profUrl = getCookie("profileUrl");
    if (profUrl == "") {
        profUrl = "https://theredencryption.github.io/online-learning-site/assets/images/user_profile_default.png";
    }
    // alert(profUrl);
    profPic.style.backgroundImage = "url(" + profUrl + ")";
}

/* yoinked from w3schools */
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function favicon() {
    let headicons =
        `
    <link rel="apple-touch-icon" sizes="180x180" href="./icons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./icons/favicon-16x16.png">
    <link rel="manifest" href="./icons/site.webmanifest">
    <link rel="mask-icon" href="./icons/safari-pinned-tab.svg" color="#b91d47">
    <link rel="shortcut icon" href="./icons/favicon.ico">
    <meta name="msapplication-TileColor" content="#b91d47">
    <meta name="msapplication-config" content="./icons/browserconfig.xml">
    <meta name="theme-color" content="#000000">
    `
    $('head').append(headicons);
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
    tab.forEach(function (htmlElement) {

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

            if (ignore != "true") {
                let aspectRatio = width / height;

                let properHeight = 100 / aspectRatio;

                htmlElement.style.backgroundSize = "100vw " + properHeight + "vw";
            }
        });

    });
}

function fontSize() {

    let tab = findElementWithAttribute("data-fontsize")

    tab.forEach(function (htmlElement) {

        let data = htmlElement.getAttribute("data-fontsize")
        htmlElement.style.fontSize = data + "px";

    });

}