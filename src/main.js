// У файлі main.js напиши всю логіку роботи додатка.
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import {searchImagesByQuery} from "./js/pixabay-api";
import {renderSearchCollection} from "./js/render-functions";
import {params} from "./js/pixabay-api";

const form = document.querySelector(".form");
const listImages = document.querySelector(".images");
const contLoader = document.querySelector(".loader-container");
// export const loadMoreBtn = document.querySelector(".load-btn");
// loadMoreBtnStatus("hide");


form.addEventListener("submit", handleSuubmit);

function handleSuubmit(e) {
    e.preventDefault();
    listImages.innerHTML = " ";
    params.q = form.elements.search.value.trim();
    if(params.q === "") {
        iziToast.error({
            title: ' ',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            titleSize: '16px',
            titleLineHeight: '24px',
            messageColor: 'white',
            messageSize: '16px',
            messageLineHeight: '24px',
            backgroundColor: '#ef4040',
            iconColor: '#ffffff',
            titleColor: '#ffffff',
            messageColor: '#ffffff',
            close: false,
            position: 'topRight',
        })
        return;
    }
    contLoader.style.display = "block";
    searchImagesByQuery(params.q)
    .then((data) => {
        contLoader.style.display = "block";
        if(data.hits[0] === undefined) {
            contLoader.style.display = "none";
            iziToast.error({
                title: ' ',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                // iconUrl: errorIcon,
                titleSize: '16px',
                titleLineHeight: '24px',
                messageColor: 'white',
                messageSize: '16px',
                messageLineHeight: '24px',
                backgroundColor: '#ef4040',
                iconColor: '#ffffff',
                titleColor: '#ffffff',
                messageColor: '#ffffff',
                close: false,
                position: 'topRight',
            })
            return;
        }


        renderSearchCollection(listImages, data.hits);
        contLoader.style.display = "none";

        listImages.addEventListener("click", handleClick);

        function handleClick(e) {
            e.preventDefault()
            if (e.target.nodeName !== 'IMG') return;
            const lightbox = new SimpleLightbox('.image-item a', { 
                captionsData: "alt",
             });
             lightbox .refresh();

        }
        form.reset();
    })
    .catch((error) => {
        console.log(error)
        contLoader.style.display = "none";
    })
}


// -----------------------------
// export function loadMoreBtnStatus(status) {
//     if (status === "hide") {
//         loadMoreBtn.classList.add("hide");
//     } else if(status === "show") {
//         loadMoreBtn.classList.remove("hide");
//     } else if(status === "disable") {
//         loadMoreBtn.disabled = true;
//     } else {
//         loadMoreBtn.disabled = false;
//     }
// }