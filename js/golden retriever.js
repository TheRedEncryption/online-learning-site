import { getStorage, ref, listAll, list, getDownloadURL, getBytes } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

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
    const listRef = ref(storage, 'courses');


    console.log(listRef)
    listAll(listRef)
        .then((res) => {
            // console.log(res.items)
            // console.log(res.prefixes)
            console.log(res);
            res.prefixes.forEach((folderRef) => {
                let holder = document.getElementById("course-holder-main");
                let coursesDataList = document.getElementById("coursesDataList");

                // please explain what this "if holder else if courses data list" is supposed to mean
                if(holder){
                    holder.innerHTML += courseModuleBuilder.buildCourse(folderRef.name, "123");
                }
                else if (coursesDataList){
                    let option = document.createElement("option")
                    option.value = folderRef.name
                    coursesDataList.appendChild(option);
                }
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.error(error)
        });
}