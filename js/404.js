import { getStorage, ref as sRef, listAll, list, getDownloadURL, getBytes } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});
try {
    document.body.innerHTML += window.location.toString().substring(window.location.origin.length + "/online-learning-site/".length);
} catch (error) {
    alert(error);
}
let courseTitle = atob(window.location.toString().substring(window.location.origin.length + "/online-learning-site/".length).split("/")[1]);
console.log(courseTitle)
let listRef = sRef(storage, "courses/" + courseTitle)
console.log(listRef)
listAll(listRef)
.then((coursesReference) => {
        console.log(coursesReference)
        // console.log(coursesReference.items)
        // console.log(coursesReference.prefixes)
        coursesReference.prefixes.forEach((folderRef) => {
            listAll(folderRef).then((userIDS)=>{
                console.log("userIDS")
                console.log(userIDS)
                userIDS.prefixes.forEach((articleRef) => {
                    listAll(articleRef).then((articleParts)=>{
                        console.log("articleParts")
                        console.log(articleParts)
                    })
                });
            })
        });
    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.error(error)
    });