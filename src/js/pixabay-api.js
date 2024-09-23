// У файлі pixabay-api.js зберігай функції для HTTP-запитів.
import axios from "axios";
// import {loadMoreBtnStatus} from "../main.js";
// import {loadMoreBtn} from "../main.js";
import {renderSearchCollection} from "./render-functions.js";


const BASE_URL = "https://pixabay.com";
const ENDPOINT = "/api/";
axios.defaults.baseURL = BASE_URL;
const API_KEY = "45940755-86be6da0f1a4750ab3bd13574"

export const params = {
    key: API_KEY,
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: 1,
    per_page: 15,
}

export async function searchImagesByQuery(query) {
    try {
        params.page = 1;
        const response = await axios.get(ENDPOINT, {params});
        return response.data;
    } catch(error) {
        console.log(error)
    }
}

export async function fetchMoreImages() {
    try{
        console.log(params.page)
        const response = await axios.get(ENDPOINT, {params});
        params.page += 1;
        return response.data;

    }catch(error) {
        console.log(error)
    }
}


// export function searchImagesByQuery(query) {
//     const URL = "https://pixabay.com/api/";
//     const API_KEY ="45940755-86be6da0f1a4750ab3bd13574";

//     const params = new URLSearchParams({
//         key: API_KEY,
//         q: query,
//         image_type: "photo",
//         orientation: "horizontal",
//         safesearch: true,
//     });

//     return fetch(`${URL}?${params}`).then((response) => {
//         if(!response.ok) {
//             throw new Error(response.status);
//         }
//         return response.json();
//     })
// }

