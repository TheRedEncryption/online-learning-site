import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
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

window.onload = main();

function main(){
    uploadFileButton.addEventListener("click", () => {
        console.log("%cYIPPEE!", "color:rgb(0,100,100); font-size:30px; background-color:rgb(0,60,240)");
        console.log(uploadFileInput.files[0].name);
        // 'file' comes from the Blob or File API
        //return;
        if(!uploadFileInput.files.length || !storageRef){
            return
        }
        uploadBytes(ref(storageRef, uploadFileInput.files[0].name), uploadFileInput.files[0]).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    })
}
