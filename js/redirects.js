// Redirects to index
function redirectToIndex(){
    safeRedirect("index.html");
}

// Redirects to a sign in page
function redirectToSignIn(){
    safeRedirect("userAuth.html");
}

// Redirects to learn page
function redirectToLearnPage(){
    safeRedirect("learn.html");
}

// Redirects to discuss page
function redirectToDiscussPage(){
    safeRedirect("discuss.html");
}

// safely redirects based on whether or not you're using production or dev
function safeRedirect(destination){
    if(window.location.origin == "https://theredencryption.github.io"){
        window.location.href = "https://theredencryption.github.io/online-learning-site/" + destination;
    }
    else{
        window.location.href = destination;
    }
}