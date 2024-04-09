import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

document.addEventListener('DOMContentLoaded', initMd, false);

var textArea;

function initMd(){
    textArea = document.getElementById("textarea");
    textArea.addEventListener("input", updateMd)
}

function updateMd(){
    var contentMd = document.getElementById("mdpreviewcontent");
    contentMd.innerHTML = DOMPurify.sanitize(marked.parse(textArea.value));
}