import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const auth = getAuth();
let uid;
let username;
// let email;
let profile_picture;
let textingInput;
let centerBody;
const db = getDatabase();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        uid = user.uid;
        if (user.displayName) {
            username = user.displayName
        }
        else {
            username = user.email;
        }
        // email = user.email
        profile_picture = user.photoURL
        console.log(user)
        console.log(uid, username, profile_picture)
    } else {
        // User is signed out
    }
});
function writeUserData(userId, name, message, imageUrl) {

    set(ref(db, 'messages/' + userId + "/" + Date.now()), {
        username: name,
        // email: email,
        message: message,
        profile_picture: imageUrl
    });
}

window.addEventListener("load", () => {
    textingInput = document.getElementById("textingInput")
    centerBody = document.getElementById("centerBody")
    textingInput.addEventListener("keyup", (e) => {
        if (e.key === 'Enter') {
            if(!(/^\s+$/.test(textingInput.value))){
                textingInput.value = DOMPurify.sanitize(marked.parse(profanityCleaner.clean(textingInput.value, { keepFirstAndLastChar: true })))
                writeUserData(uid, username, textingInput.value, profile_picture)
            }
            textingInput.value = ""
        }
    })
    const messagesRef = ref(db, 'messages/');
    onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        centerBody.innerHTML = ""
        let messagesByTimestamp = [];
        for (const [key, value] of Object.entries(data)) {
            console.log(`key1 ${key}: ${value}`);
            for (const [key2, value2] of Object.entries(value)) {
                console.log(`key2 ${key2}: ${value2}`);
                messagesByTimestamp.push({
                    timestamp: key2,
                    value: value2
                })
                console.log(`MESSAGE ${value2.message}`);
                // centerBody.innerHTML += `<div><b>${value2.username}</b><p>${value2.message}</p></div>`
            }
        }
        messagesByTimestamp.sort(function (a, b) {
            var keyA = a.timestamp,
                keyB = b.timestamp;
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        console.log(messagesByTimestamp)
        for(var i = 0; i < messagesByTimestamp.length; i++){
            let currentMessage = messagesByTimestamp[i];
            let previousMessage = messagesByTimestamp[i-1];
            if(previousMessage!==undefined && previousMessage.value.username === currentMessage.value.username){
                centerBody.innerHTML += `<div><p>${currentMessage.value.message}</p></div>`
            }
            else{
                centerBody.innerHTML += `<div><b>${currentMessage.value.username}</b><p>${currentMessage.value.message}</p></div>`
            }
        }
        centerBody.scroll({
            top: 1000000000,
            behavior: "smooth",
          });
        console.log(data);
        console.log(typeof (data));
    });
})