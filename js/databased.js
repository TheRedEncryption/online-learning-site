import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const parser = new DOMParser();
const auth = getAuth();
let uid;
let username;
// let email;
let profile_picture;
let textingInput;
let centerBody;
const extraBadWords = ["skibidi", "gyatt", "kill yourself", "cameraman", "helldivers"]

const emoteLinks = [
    "kitty.png",
    "yippee.jpg",
    "yippee_bounce.gif"
]
const emoteNames = [];
emoteLinks.forEach((element) => {
    emoteNames.push(element.substring(0, element.indexOf(".")))
})
console.log(emoteNames)

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
    if (!imageUrl) {
        imageUrl = "/online-learning-site/assets/images/user_profile_default.png"
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
    textingInput.addEventListener("focus", () => {
        textingInput.setAttribute("placeholder", ":" + emoteNames.join(": :") + ":")
    })
    textingInput.addEventListener("focusout", () => {
        textingInput.setAttribute("placeholder", "");
    })
    textingInput.addEventListener("keyup", (e) => {
        if (e.key === 'Enter') {
            if (!(textingInput.value.trim() == "")) {
                if (textingInput.value.length > 1000) {
                    textingInput.classList.add("redshake")
                    setTimeout(() => {
                        textingInput.classList.remove("redshake")
                    }, 1000);
                    return console.error("Too long")
                }
                textingInput.value = textingInput.value.replaceAll("<", "");
                let temp = textingInput.value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+,.~#?&//=]*)/);
                textingInput.value = DOMPurify.sanitize(profanityCleaner.clean(textingInput.value, { keepFirstAndLastChar: true, customBadWords: extraBadWords }))
                let emotes = textingInput.value.match(/:.+?:/g)
                if (emotes) {
                    // console.log(emotes)
                    for (var i = 0; i < emotes.length; i++) {
                        let emoteURL = emoteLinks.find((element) => element.includes(emotes[i].replaceAll(":", "")))
                        if (emoteURL) {
                            emotes[i] = `<img src="/online-learning-site/emotes/${emoteURL}" width="${pfpWidth}"></img>`
                            // console.log(emotes[i])
                            textingInput.value = textingInput.value.replace(/:.+?:/, emotes[i])
                            // console.log(currentMessage.value.message)
                        }
                    }
                }
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
                messagesByTimestamp.push({
                    timestamp: key2,
                    value: value2,
                    userReference: key
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
            if (!currentMessage.value.profile_picture) {
                currentMessage.value.profile_picture = "../assets/images/user_profile_default.png"
            }
            let timedate = new Date(+currentMessage.timestamp);
            let isSameUser;
            if (currentMessage.userReference === uid) {
                isSameUser = true;
            }
            else {
                isSameUser = false;
            }
            if (previousMessage !== undefined && previousMessage.value.username === currentMessage.value.username && Math.abs(lastHeaderTime - currentMessage.timestamp) < 20 * 60 * 1000) {
                centerBody.innerHTML += `<div>
                <div class="timeMessageContainer">
                <div class="flexContainer1">
                    <p class="timeMessageColumn actualTime">
                        ${("" + timedate.getHours() % 12).padStart(2, "0")}:${("" + timedate.getMinutes()).padStart(2, "0")}:${("" + timedate.getSeconds()).padStart(2, "0")}
                    </p>
                    <div>&nbsp</div>
                    <div class="theMessageItself">${currentMessage.value.message}</div>
                    <div>&nbsp</div>
                </div>
                <div class="flexContainer2">
                    <div class ="deleteButtonContainer">
                        ${isSameUser ? `<button class="deleteButton" id="${btoa("" + currentMessage.userReference + "," + currentMessage.timestamp)}">🗑️</button>` : ''}
                    </div>
                </div>
            </div>
                </div>`
            }
            else {
                centerBody.innerHTML += `<div>
                    <div class="messageHeader">
                        <img width="${pfpWidth}" class="circleBorder" src="${currentMessage.value.profile_picture}"></img>
                        &nbsp
                        <b>${currentMessage.value.username}</b>
                    </div>
                    <div class="timeMessageContainer">
                        <div class="flexContainer1">
                            <p class="timeMessageColumn actualTime">
                                ${("" + timedate.getHours() % 12).padStart(2, "0")}:${("" + timedate.getMinutes()).padStart(2, "0")}:${("" + timedate.getSeconds()).padStart(2, "0")}
                            </p>
                            <div>&nbsp</div>
                            <div class="theMessageItself">${currentMessage.value.message}</div>
                            <div>&nbsp</div>
                        </div>
                        <div class="flexContainer2">
                            <div class ="deleteButtonContainer">
                                ${isSameUser ? `<button class="deleteButton" id="${btoa("" + currentMessage.userReference + "," + currentMessage.timestamp)}">🗑️</button>` : ''}
                            </div>
                        </div>
                    </div>
                </div>`
            }
        }
        let deleteButtons = document.getElementsByClassName("deleteButton");
        for (var button of deleteButtons) {
            button.addEventListener("click", (e) => {
                console.log(atob(e.currentTarget.id).split(',')[0]);
                let userandtime = atob(e.currentTarget.id).split(',')
                console.log(userandtime[0] + "/" + userandtime[1])
                console.log(db)
                let tempRef = ref(db, "messages/" + userandtime[0] + "/" + userandtime[1])
                console.log(tempRef)
                remove(tempRef)
            })
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

function removeMessage(reference) {
    reference

}