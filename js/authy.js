// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { GoogleAuthProvider, connectAuthEmulator, getAuth, onAuthStateChanged, signInWithPopup, signOut, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj-9Y7n46PN1FE68obFl87b5eCJ4zgOH8",
  authDomain: "the-ruby-e-institute-of-dreams.firebaseapp.com",
  projectId: "the-ruby-e-institute-of-dreams",
  storageBucket: "the-ruby-e-institute-of-dreams.appspot.com",
  messagingSenderId: "380371112503",
  appId: "1:380371112503:web:44b1c9bc5fa3b0362ea5b2",
  measurementId: "G-WFLRF3N7KK",
  storageBucket: 'gs://the-ruby-e-institute-of-dreams.appspot.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const admin = null;
const analytics = getAnalytics(app);

const auth = getAuth();

if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}

const signInButton = document.getElementById(
  'quickstart-sign-in',
);
const userProfileImg = document.getElementById(
  'user-profile-image',
);

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailSignInButton = document.getElementById(
  'quickstart-sign-in-email',
);
const signUpButton = document.getElementById(
  'quickstart-sign-up',
);
const passwordResetButton = document.getElementById(
  'quickstart-password-reset',
);
const verifyEmailButton = document.getElementById(
  'quickstart-verify-email',
);
// const signInStatus = document.getElementById(
//   'quickstart-sign-in-status',
// );
// const accountDetails = document.getElementById(
//   'quickstart-account-details',
// );


// const oauthToken = document.getElementById(
//   'quickstart-oauthtoken',
// );
// const signInStatus = document.getElementById(
//   'quickstart-sign-in-status',
// );
// const accountDetails = document.getElementById(
//   'quickstart-account-details',
// );

/**
 * Function called when clicking the Login/Logout button.
 */
function toggleSignIn() {
  if (!auth.currentUser) {
    const provider = new GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
      .then(function (result) {
        if (!result) return;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        //oauthToken.textContent = token ?? '';
      })
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert(
            'You have already signed up with a different auth provider for that email.',
          );
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
      });
  } else {
    signOut(auth);
  }
  signInButton.disabled = true;
}

/**
 * Handles the sign in button press.
 */
function toggleSignInEmail() {
  if (auth.currentUser) {
    signOut(auth);
  } else {
    const email = emailInput.value;
    const password = passwordInput.value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    signInWithEmailAndPassword(auth, email, password).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      emailSignInButton.disabled = false;
    });
  }
  emailSignInButton.disabled = true;
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  const email = emailInput.value;
  const password = passwordInput.value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Create user with email and pass.
  createUserWithEmailAndPassword(auth, email, password).catch(function (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}

/**
 * Sends an email verification to the user.
 */
function sendVerificationEmailToUser() {
  if(!auth.currentUser){
    return;
  }
  sendEmailVerification(auth.currentUser).then(function () {
    // Email Verification sent!
    alert('Email Verification Sent!');
  });
}

function sendPasswordReset() {
  const email = emailInput.value;
  sendPasswordResetEmail(auth, email)
    .then(function () {
      // Password Reset Email Sent!
      alert('Password Reset Email Sent!');
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
    });
}

// Listening for auth state changes.
onAuthStateChanged(auth, function (user) {
  if (user) {
    // const listAllUsers = (nextPageToken) => {
    //   // List batch of users, 1000 at a time.
    //   let userNumber = 0;
    //   getAuth()
    //     .listUsers(1000, nextPageToken)
    //     .then((listUsersResult) => {
    //       listUsersResult.users.forEach((userRecord) => {
    //         userNumber++;
    //         //console.log('user', userRecord.toJSON());
    //       });
    //       if (listUsersResult.pageToken) {
    //         // List next batch of users.
    //         listAllUsers(listUsersResult.pageToken);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log('Error listing users:', error);
    //     });
    //   return userNumber;
    // };
    // // Start listing users from the beginning, 1000 at a time.
    // let amountOfUsers = listAllUsers();
    // let temp = document.getElementsByClassName("number-of-users");
    // for (item of temp){
    //   item.innerText = amountOfUsers;
    // };
    // User is signed in.
    const displayName = user.displayName;
    const email = user.email;
    const emailVerified = user.emailVerified;
    const photoURL = user.photoURL;
    const isAnonymous = user.isAnonymous;
    const uid = user.uid;
    const providerData = user.providerData;
    // signInStatus.textContent = 'Signed in';
    if (signInButton) {
      signInButton.textContent = 'Sign out';
    }
    // signInStatus.textContent = 'Signed in';
    if(emailSignInButton){
      emailSignInButton.textContent = 'Sign out';
      //accountDetails.textContent = JSON.stringify(user, null, '  ');
    }
    if (!emailVerified) {
      verifyEmailButton.disabled = false;
    }
    // accountDetails.textContent = JSON.stringify(user, null, '  ');
    var newImg = new Image;
    newImg.onload = function () {
      userProfileImg.src = this.src;
      userProfileImg.style.marginTop = "1em";
      userProfileImg.style.borderRadius = "50%";
    }
    newImg.src = photoURL;

  } else {
    // User is signed out.
    // signInStatus.textContent = 'Signed out';
    if (signInButton) {
      signInButton.textContent = 'Sign in with Google';
    }
    //signInStatus.textContent = 'Signed out';
    if(emailSignInButton){
      emailSignInButton.textContent = 'Sign in';
      //accountDetails.textContent = 'null';
    }
    //accountDetails.textContent = 'null';
    //oauthToken.textContent = 'null';
    userProfileImg.src = "";
  }
  if (signInButton) {
    signInButton.disabled = false;
    emailSignInButton.disabled = false;
  }
});
if (signInButton) {
  signInButton.addEventListener('click', toggleSignIn, false);
  emailSignInButton.addEventListener('click', toggleSignInEmail, false);
  signUpButton.addEventListener('click', handleSignUp, false);
  verifyEmailButton.addEventListener('click', sendVerificationEmailToUser, false);
  passwordResetButton.addEventListener('click', sendPasswordReset, false);
}
