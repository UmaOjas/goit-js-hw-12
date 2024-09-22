// У файлі render-functions.js створи функції для відображення елементів інтерфейсу.
// { webformatUrl, largeImageUrl, tags, likes, views, comments, downloads}


export function renderSearchCollection(listImages, images) {
    function imageTemplate({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
        return  `<li class="image-item">
        <a href="${largeImageURL}">
        <img
        class="search-image"
        src="${webformatURL}"
        alt="${tags}" />
        <table class="image-table">
            <tr>
                <th>Likes</th>
                <th>Views</th>
                <th>Comments</th>
                <th>Downloads</th>
            </tr>
            <tr>
                <td>${likes}</td>
                <td>${views}</td>
                <td>${comments}</td>
                <td>${downloads}</td>
            </tr>
        </table>
        </a>
        </li>`
    }

    function imagesTemplate(arr) {
        return arr.map(imageTemplate).join('');
    };
    const markup = imagesTemplate(images);
    listImages.insertAdjacentHTML('beforeend', markup);
}