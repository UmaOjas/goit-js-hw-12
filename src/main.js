// У файлі main.js напиши всю логіку роботи додатка.
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import {searchImagesByQuery} from "./js/pixabay-api";
import {renderSearchCollection} from "./js/render-functions";
import {params} from "./js/pixabay-api";
import {fetchMoreImages} from "./js/pixabay-api";

const form = document.querySelector(".form");
export const listImages = document.querySelector(".images");
const contLoader = document.querySelector(".loader-container");
const loadMoreBtn = document.querySelector(".load-btn");
loadMoreBtnStatus("hide");
let heightScroll;


form.addEventListener("submit", handleSuubmit);

async function handleSuubmit(e) {
    e.preventDefault();
    // очищуємо
    listImages.innerHTML = " ";
    // отримуємо дані з форми
    params.q = form.elements.search.value.trim();
    // якщо форма пуста - помилка
    if(params.q === "") {
        loadMoreBtnStatus("hide");
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
    // відправляємо запит
    try {
        params.page = 1;

        const images = await searchImagesByQuery(params.q);
        // вмикаємо лоадер
        contLoader.style.display = "block";
        params.page += 1;
        // якщо немає даних - помилка
        if(images.hits[0] === undefined) {
            contLoader.style.display = "none";
            loadMoreBtnStatus("hide");
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

        // відправляємо на відбудовування колекції
        renderSearchCollection(listImages, images.hits);
        let elem = document.querySelector(".image-item");
        let rect = elem.getBoundingClientRect();
        heightScroll = rect.height * 2;

    
        // після відбудовування вимикаємо лоадер і вмикаємо кнопку "загрузити ще"
        contLoader.style.display = "none";
        // отримуємо кількість картинок усього
        const totalHits = images.totalHits;
        // рахуємо кількість сторінок з картинками
        const totalPages = Math.ceil(totalHits / params.per_page)
        // якщо кількості сторінок не менше, ніж номер поточної сторінки - кнопку ховаємо, 
        // якщо більше - вмикаємо і додаємо слухача подій
        if(params.page >= totalPages) {
            loadMoreBtnStatus("hide");
            iziToast.error({
                title: ' ',
                message: "We're sorry, but you've reached the end of search results.",
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
        } else {
            loadMoreBtnStatus("show");
            // переходимо на наступну сторінку
            // додаємо прослуховувача подій на кнопку загрузити ще
            loadMoreBtn.addEventListener("click", handleMoreImages)
        }   

        // МОДАЛКА
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

    } catch(error) {
        console.log(error)
        contLoader.style.display = "none";
    }
}

// прослуховувач подій на кнопці загрузити ще
async function handleMoreImages() {
    try {
        contLoader.style.display = "block";
        loadMoreBtnStatus("disabled");
        const moreImages = await fetchMoreImages();
        params.page += 1;
        renderSearchCollection(listImages, moreImages.hits);
        window.scrollBy({
            top: heightScroll,
            behavior: "smooth",
          });
        contLoader.style.display = "none";
        // отримуємо кількість картинок усього
        const totalHits = moreImages.totalHits;
        // рахуємо кількість сторінок з картинками
        const totalPages = Math.ceil(totalHits / params.per_page)
        if(params.page > totalPages) {
            loadMoreBtnStatus("hide");
            iziToast.error({
                title: ' ',
                message: "We're sorry, but you've reached the end of search results.",
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
        } else {
            loadMoreBtnStatus();
        }
    }catch(error) {
        console.log(error)
    }
}


// -----------------------------
export function loadMoreBtnStatus(status) {
    if (status === "hide") {
        loadMoreBtn.classList.add("hide");
    } else if(status === "show") {
        loadMoreBtn.classList.remove("hide");
    } else if(status === "disable") {
        loadMoreBtn.disabled = true;
    } else {
        loadMoreBtn.disabled = false;
    }
}

