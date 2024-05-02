// Redirects to a sign in page
function redirectToSignIn(){
    safeRedirect("userAuth.html");
}

// Redirects to a sign in page
function redirectToLearnPage(){
    safeRedirect("learn.html");
}

// Redirects to a sign in page
function redirectToDiscussPage(){
    safeRedirect("discuss.html");
}

function safeRedirect(destination){
    if(window.location.origin == "https://theredencryption.github.io"){
        window.location.replace("https://theredencryption.github.io/" + destination);
    }
    else{
        window.location.replace(destination);
    }
}