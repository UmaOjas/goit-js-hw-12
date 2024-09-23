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
        const images = await searchImagesByQuery(params.q);
        // вмикаємо лоадер
        contLoader.style.display = "block";
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
            params.page += 1;
            // додаємо прослуховувача подій на кнопку загрузити ще
            loadMoreBtn.addEventListener("click", handleMoreImages)
            // викликаємо прослуховувач подій
            async function handleMoreImages() {
                try {
                contLoader.style.display = "block";
                const moreImages = await fetchMoreImages();
                renderSearchCollection(listImages, moreImages.hits);
                contLoader.style.display = "none";
                if(params.page > totalPages) {
                    console.log(params.page)
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
                }
            }catch(error) {
                console.log(error)
            }
        }
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