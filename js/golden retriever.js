import { getStorage, ref, listAll, list, getDownloadURL, getBytes } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Get a reference to the storage service, which is used to create references in your storage bucket

const storage = getStorage();

// Create a storage reference from our storage service

const uploadFileButton = document.getElementById(
    'uploadFileButton',
);

const uploadFileInput = document.getElementById(
    'uploadFileInput',
);


let storageRef;
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        storageRef = ref(storage, `user/${user.uid}`);
        // ...
    } else {
        // User is signed out
        // ...
    }
});

window.addEventListener("load", initialCall());

async function initialCall() {

    // Create a reference with an initial file path and name
    const storage = getStorage();
    const listRef = ref(storage, 'user');


    console.log(listRef)
    listAll(listRef)
        .then((res) => {
            // console.log(res.items)
            // console.log(res.prefixes)
            res.prefixes.forEach((folderRef) => {
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
                listAll(folderRef)
                    .then((res2) => {
                        res2.prefixes.forEach((folderRef2) => {
                            // All the prefixes under listRef.
                            // You may call listAll() recursively on them.
                            listAll(folderRef2)
                                .then((res3) => {
                                    console.log(res3);
                                    res3.items.forEach((itemRef3) => {
                                        // All the items under listRef.
                                        console.log(itemRef3)
                                        // XMLHttpRequest
                                        getDownloadURL(itemRef3)
                                            .then((url) => {
                                                // `url` is the download URL for 'images/stars.jpg'
                                                console.log(url);

                                                // This can be downloaded directly:
                                                const xhr = new XMLHttpRequest();
                                                xhr.responseType = 'blob';
                                                xhr.onload = (event) => {
                                                    const blob = xhr.response;
                                                };
                                                xhr.open('GET', url);
                                                xhr.send();

                                                // Or inserted into an <img> element
                                                const img = document.getElementById('myimg');
                                                img.setAttribute('src', url);
                                            })
                                            .catch((error) => {
                                                // Handle any errors
                                            });
                                    });
                                });
                        });
                    });
            });
            res.items.forEach((itemRef) => {
                // All the items under listRef.
                console.log(itemRef)
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.error(error)
        });
}