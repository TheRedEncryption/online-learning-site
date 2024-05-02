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
let urlString = window.location.toString().substring(window.location.origin.length + "/online-learning-site/".length)
let urlArray = urlString.split("/")
try {
    document.body.innerHTML += urlString;
} catch (error) {
    alert(error);
}
console.log(urlArray)
if(urlArray[0] === 'course' && urlArray[2] === 'read'){
    let courseTitle = atob(urlArray[1]);
    let articleTitle = atob(urlArray[3]);
    console.log("BOTH")
    console.log(courseTitle)
    console.log(articleTitle)
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
                            articleParts.items.forEach((file) => {
                                console.log(file)
                                getDownloadURL(file)
                                    .then((url) => {
                                        // `url` is the download URL for 'images/stars.jpg'
                                        console.log(url);

                                        // This can be downloaded directly:
                                        const xhr = new XMLHttpRequest();
                                        xhr.responseType = 'blob';
                                        xhr.onload = (event) => {
                                            const blob = xhr.response;
                                            if (blob.type === "text/plain") {
                                                // WILL USE FOR LOADING TEXT AND MP4 ONTO PAGE
                                                blob.text().then((givemetheshit)=>{
                                                    document.getElementById("temptextplacehere").innerHTML += marked.parse(givemetheshit) + "\n\n";
                                                })
                                            }
                                        };
                                        xhr.open('GET', url);
                                        xhr.send();



                                        // // Or inserted into an <img> element
                                        // const img = document.getElementById('myimg');
                                        // img.setAttribute('src', url);
                                    })
                                    .catch((error) => {
                                        // Handle any errors
                                    });
                            });
                            // document.body.innerHTML += articleModuleBuilder.buildCourse(articleRef.name, articleRef.parent.name);
                        })
                    });
                })
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.error(error)
        });
}
else if(urlArray[0] === 'course'){
    let courseTitle = atob(urlArray[1]);
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
                        document.body.innerHTML += articleModuleBuilder.buildCourse(articleRef.name, articleRef.parent.name);
                    });
                })
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.error(error)
        });
}