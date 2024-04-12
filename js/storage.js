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

window.addEventListener("load", initialCall());

function initialCall() {
  uploadFileButton.addEventListener("click", () => {
    console.log("%cYIPPEE!", "color:rgb(0,100,100); font-size:30px; background-color:rgb(0,60,240)");
    //console.log(uploadFileInput.files[0].name);


    let projectName = document.getElementById("projectName");
    if(!projectName.value){
      return console.error("No project name")
    }
    // 'file' comes from the Blob or File API
    //return;
    // if ((!uploadFileInput.files.length || !storageRef) && (!document.getElementById("textarea").value=="")) {
    //   return console.error("No file/textarea value")
    // }
    var blob = new Blob([document.getElementById("textarea").value], {type: "text/plain"});
    /*uploadFileInput.files[0].name*/
    if(uploadFileInput.files[0]){
      uploadBytes(ref(storageRef, projectName.value + "/" + uploadFileInput.files[0].name), uploadFileInput.files[0]).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        document.getElementById("badtoast").innerText += "File success"
      }).catch((error) => {
        console.error(error);
        document.getElementById("badtoast").innerText += "File failure: " + error
      })
    }
    if(blob){
      uploadBytes(ref(storageRef, projectName.value + "/" + "markdownText.txt"), blob).then((snapshot) => {
        console.log('Uploaded the markdown blob or file!');
        document.getElementById("badtoast").innerText += "Markdown success"
      }).catch((error) => {
        document.getElementById("badtoast").innerText += "Markdown failure: " + error
        console.error(error);
      })
    }    

  })
}
