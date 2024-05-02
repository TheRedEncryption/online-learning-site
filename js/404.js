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
// try {
//     document.body.innerHTML += urlString;
// } catch (error) {
//     alert(error);
// }
console.log(urlArray)
if(urlArray[0] === 'course' && urlArray[2] === 'read'){
    let centerModule2 = document.getElementById("centerModule2");
    let tempVideoElement = document.createElement('video')
    //        <video id="tempvideoplacehere" controls style="width:800px;height:600px;"></video>
    tempVideoElement.id="videoHolder"
    tempVideoElement.controls = true;
    tempVideoElement.style = "width:1px;height:1px;"
    centerModule2.insertBefore(tempVideoElement, centerModule2.firstChild)
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
                        if(articleRef.name === articleTitle){
                            listAll(articleRef).then((articleParts)=>{
                                console.log("articleParts")
                                console.log(articleParts)
                                let hasVideo = false;
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
                                                        document.getElementById("markdownHolder").innerHTML += marked.parse(givemetheshit) + "\n\n";
                                                    })
                                                }
                                                else if (blob.type.indexOf("video/")==0) {
                                                    // WILL USE FOR LOADING TEXT AND MP4 ONTO PAGE
                                                    hasVideo = true;
                                                    tempVideoElement.style = "width:800px;height:600px;"
                                                    display(blob, document.getElementById("videoHolder"))
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
                                if(!hasVideo){
                                    document.getElementById("videoHolder").remove();
                                }
                                // document.body.innerHTML += articleModuleBuilder.buildCourse(articleRef.name, articleRef.parent.name);
                            })
                        }
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
                        document.getElementById("markdownHolder").innerHTML += articleModuleBuilder.buildCourse(articleRef.name, articleRef.parent.name);
                    });
                })
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.error(error)
        });
}
else{

}

/**
 * @param {Blob} videoFile
 * @param {HTMLVideoElement} videoEl 
 * @returns {void}
 */
function display( videoFile, videoEl ) {

    // Preconditions:
    if( !( videoFile instanceof Blob ) ) throw new Error( '`videoFile` must be a Blob or File object.' ); // The `File` prototype extends the `Blob` prototype, so `instanceof Blob` works for both.
    if( !( videoEl instanceof HTMLVideoElement ) ) throw new Error( '`videoEl` must be a <video> element.' );
    
    // 

    const newObjectUrl = URL.createObjectURL( videoFile );
        
    // URLs created by `URL.createObjectURL` always use the `blob:` URI scheme: https://w3c.github.io/FileAPI/#dfn-createObjectURL
    const oldObjectUrl = videoEl.currentSrc;
    if( oldObjectUrl && oldObjectUrl.startsWith('blob:') ) {
        // It is very important to revoke the previous ObjectURL to prevent memory leaks. Un-set the `src` first.
        // See https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL

        videoEl.src = ''; // <-- Un-set the src property *before* revoking the object URL.
        URL.revokeObjectURL( oldObjectUrl );
    }

    // Then set the new URL:
    videoEl.src = newObjectUrl;

    // And load it:
    videoEl.load(); // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/load
    
}