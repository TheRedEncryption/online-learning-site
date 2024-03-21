import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

// Get a reference to the storage service, which is used to create references in your storage bucket

const storage = getStorage();

// Create a storage reference from our storage service

const uploadFileButton = document.getElementById(
    'uploadFileButton',
);

const uploadFileInput = document.getElementById(
    'uploadFileInput',
);

const storageRef = ref(storage, "videos");

window.onload = main();

function main(){
    uploadFileButton.addEventListener("click", () => {
        console.log("%cYIPPEE!", "color:rgb(0,100,100); font-size:30px; background-color:rgb(0,60,240)");
        console.log(uploadFileInput.files[0].name);
        // 'file' comes from the Blob or File API
        //return;
        if(!uploadFileInput.files.length){
            return
        }
        uploadBytes(ref(storageRef, uploadFileInput.files[0].name), uploadFileInput.files[0]).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    })
}
