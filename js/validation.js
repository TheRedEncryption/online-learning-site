document.addEventListener('DOMContentLoaded', initializeValidation, false);

var emailText;
var passwordText;

const emailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

function initializeValidation() {
    // init stuff goes here
    emailText = document.getElementById("email");
    passwordText = document.getElementById("password");
    emailText.addEventListener("input", updateEmailValidation);
    passwordText.addEventListener("input", updatePasswordValidation);
}

function updateEmailValidation(){
    var valid = emailRe.exec(emailText.value) != null;
    if (valid){
        emailText.style = "border: solid 4px lime;";
    }
    else{
        emailText.style = "border: solid 4px red;";
    }
}

function updatePasswordValidation(){
    var score = zxcvbn(passwordText.value).score;
    switch (score) {
        case 0:
            passwordText.style = "border: solid 4px brown;";
            break;
        case 1:
            passwordText.style = "border: solid 4px red;";
            break;
        case 2:
            passwordText.style = "border: solid 4px orange;";
            break;
        case 3:
            passwordText.style = "border: solid 4px yellow;";
            break;
        case 4:
            passwordText.style = "border: solid 4px lime;";
            break;
        default:
            passwordText.style = "border: solid 4px black;";
            break;
    }
}