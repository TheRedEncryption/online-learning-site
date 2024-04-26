import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const parser = new DOMParser();
const auth = getAuth();
let uid;
let username;
// let email;
let profile_picture;
let textingInput;
let centerBody;
let pfpWidth = "30px";
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
        // console.log(user)
        // console.log(uid, username, profile_picture)
    } else {
        // User is signed out
    }
});
function writeUserData(userId, name, message, imageUrl) {
    if(!imageUrl){
        imageUrl = "../assets/images/user_profile_default.png"
    }

    set(ref(db, 'messages/' + userId + "/" + Date.now()), {
        uid: userId,
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
            if (!(/^\s+$/.test(textingInput.value))) {
                textingInput.value = textingInput.value.replaceAll("<", "");
                let temp = textingInput.value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+,.~#?&//=]*)/);
                textingInput.value = DOMPurify.sanitize(profanityCleaner.clean(textingInput.value, { keepFirstAndLastChar: true }))
                // if(temp){
                //     // console.error(temp[0]);
                //     let temp2=prepareFrame(temp[0]);
                //     temp2.classList.add("fullWidth");
                //     console.log(temp2)
                //     textingInput.value = textingInput.value.replace(temp[0], temp2.outerHTML)
                //     console.log(textingInput.value)
                // }
                textingInput.value = marked.parse(textingInput.value);
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
            for (const [key2, value2] of Object.entries(value)) {
                // console.log(`key2 ${key2}: ${value2}`);
                // console.log(value2);
                messagesByTimestamp.push({
                    timestamp: key2,
                    value: value2
                })
                // console.log(`MESSAGE ${value2.message}`);
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
        // console.log(messagesByTimestamp)
        let lastHeaderTime = 0;
        for (var i = 0; i < messagesByTimestamp.length; i++) {
            let currentMessage = messagesByTimestamp[i];
            let previousMessage = messagesByTimestamp[i - 1];
            lastHeaderTime = currentMessage.timestamp
            if(!currentMessage.value.profile_picture){
                currentMessage.value.profile_picture = "../assets/images/user_profile_default.png"
            }
            let timedate = new Date(+currentMessage.timestamp);
            if (previousMessage !== undefined && previousMessage.value.username === currentMessage.value.username && Math.abs(lastHeaderTime - currentMessage.timestamp) < 20 * 60 * 1000) {
                centerBody.innerHTML += `<div><div class="timeMessageContainer"><p class="timeMessageColumn actualTime">${(""+timedate.getHours()%12).padStart(2,"0")}:${(""+timedate.getMinutes()).padStart(2,"0")}:${(""+timedate.getSeconds()).padStart(2,"0")}</p><div>&nbsp</div><div class="timeMessageColumn theMessageItself">${currentMessage.value.message}</div></div></div>`
            }
            else {
                centerBody.innerHTML += `<div><div class="messageHeader"><img width="${pfpWidth}" class="circleBorder" src="${currentMessage.value.profile_picture}"></img>&nbsp<b>${currentMessage.value.username}</b></div><div class="timeMessageContainer"><p class="timeMessageColumn actualTime">${(""+timedate.getHours()%12).padStart(2,"0")}:${(""+timedate.getMinutes()).padStart(2,"0")}:${(""+timedate.getSeconds()).padStart(2,"0")}</p><div>&nbsp</div><div class="theMessageItself">${currentMessage.value.message}</div></div></div>`
            }
        }
        centerBody.scroll({
            top: 1000000000,
            behavior: "smooth",
        });
    });
})

function prepareFrame(url) {
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", url);
    ifrm.style.width = "640px";
    ifrm.style.height = "480px";
    return ifrm;
}