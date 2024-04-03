import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

document.addEventListener('DOMContentLoaded', initMd, false);

var textArea;

function initMd(){
    textArea = document.getElementById("textarea");
    textArea.addEventListener("change", updateMd)
}

function updateMd(){
    var contentMd = document.getElementById("content");
    contentMd.innerHTML = marked.parse(textArea.value);
}