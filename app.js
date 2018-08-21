/* jshint esversion : 6 */
/* global window */
/* global document */
const app = (function app() {
    "use strict";
    var html = {},
        count = 0,
        imgTableau = [];

    const handleFormSubmit = function handleFormSubmit(evt) {
        evt.preventDefault();
        //permet d'éviter le comportement par defaut des formulaires qui recharge l'index.html lors de l'envois
    };

    //    const createImg = function createImg(src) {
    //        var img = document.createElement("img");
    //        img.src = src;
    //        img.className = "img";
    //        return img;
    //    };
    //
    //    const appendImg = function appendImg(img, dad) {
    //        var newImg = dad.appendChild(img);
    //        return newImg;
    //    };

    var verifFiles = function (file, mime) {
        if (file.type.match(mime)) {
            return true
        }
    }
    const revealArrows = function revealArrows() {
        html.previous.classList.add("is-reveal");
        html.next.classList.add("is-reveal");

    }

    const getFiles2 = function getFiles2(file) {
        if (verifFiles(file, "image")) {
            const reader = new FileReader();
            reader.onload = function getFile2(evt) {
                const src = evt.target || evt.srcElement;
                imgTableau.push(src.result);
                html.image.src = imgTableau[0];
                revealArrows();
            };
            reader.readAsDataURL(file);
        } else {
            window.console.error("mauvais type de fichier");
        }

    };
    const handleFiles = function handleFiles(evt) {
        const src = evt.target || evt.srcElement;
        var arr = Array.from(src.files);
        arr.forEach(getFiles2);
    };

    const handleEvents = function handleEvents() {
        html.input.onchange = handleFiles;
        //        html.btn.onclick = handleFormSubmit;
        html.inputBtn.onclick = function () {
            html.input.click();
        };
        html.next.onclick = moveToNextImg;
        html.previous.onclick = moveToPreviousImg;
    };
    const moveToNextImg = function moveToNextImg() {

        if (count < imgTableau.length - 1) {
            count += 1;
            html.image.src = imgTableau[count];
        } else {
            count = 0;
            html.image.src = imgTableau[count];
        }
    };
    const moveToPreviousImg = function moveToPreviousImg() {
        if (count === 0) {
            count = imgTableau.length - 1;
            html.image.src = imgTableau[count];

        } else {
            count--;
            html.image.src = imgTableau[count];
        }
    };
    const getDOMRefs = function getDOMRefs() {
        return {
            //            form: document.getElementById("form_file"),
            input: document.getElementById("file_upload"),
            inputBtn: document.getElementById("file_upload_btn"),
            btn: document.getElementById("submit"),
            div: document.getElementById("my_gallery"),
            next: document.getElementById('move_next'),
            previous: document.getElementById('move_previous'),
            image: document.getElementById("image")
        };
    };
    const start = function start() {
        html = getDOMRefs();
        handleEvents();
    };
    window.addEventListener("DOMContentLoaded", start);
}());
