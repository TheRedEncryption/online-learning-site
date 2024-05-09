import { getStorage, ref as sRef, listAll, list, getDownloadURL, getBytes} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
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

window.addEventListener("load", initialCall());

async function initialCall() {

    // Create a reference with an initial file path and name
    const storage = getStorage();
    const listRef = sRef(storage, 'courses');


    console.log(listRef)
    listAll(listRef)
        .then((res) => {
            // console.log(res.items)
            // console.log(res.prefixes)
            res.prefixes.forEach((folderRef) => {
                let holder = document.getElementById("course-holder-main");
                let coursesDataList = document.getElementById("coursesDataList");
                
                // please explain what this "if holder else if courses data list" is supposed to mean
                listAll(folderRef).then((res2)=>{
                    if(holder){
                        let searchOption = document.createElement("option")
                        searchOption.value = folderRef.name;
                        document.getElementById("coursesData").appendChild(searchOption);
                        holder.innerHTML += courseModuleBuilder.buildCourse(folderRef.name, res2.prefixes[0].name);
                    }
                    else if (coursesDataList){
                        let option = document.createElement("option")
                        option.value = folderRef.name
                        coursesDataList.appendChild(option);
                    }
                })
            });
            document.getElementById("courseName").disabled=false;
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.error(error)
        });
}