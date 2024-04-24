import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const auth = getAuth();
let uid; 
let username; 
let email;
let profile_picture;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        uid = user.uid;
        username = user.displayName
        email = user.email
        profile_picture = user.photoURL
        console.log(user)
        console.log(uid, username, email, profile_picture)
        writeUserData(uid, username, email,profile_picture)
    } else {
        // User is signed out
    }
});

function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

window.addEventListener("load",()=>{
    
})