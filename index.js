import{a as m,i as u,S as b}from"./assets/vendor-CRCB-GUD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const L="https://pixabay.com",S="/api/";m.defaults.baseURL=L;const x="45940755-86be6da0f1a4750ab3bd13574",l={key:x,q:"",image_type:"photo",orientation:"horizontal",safesearch:!0};async function C(s){try{return(await m.get(S,{params:l})).data}catch(r){console.log(r)}}function q(s,r){function i({webformatURL:t,largeImageURL:n,tags:d,likes:g,views:h,comments:p,downloads:y}){return`<li class="image-item">
        <a href="${n}">
        <img
        class="search-image"
        src="${t}"
        alt="${d}" />
        <table class="image-table">
            <tr>
                <th>Likes</th>
                <th>Views</th>
                <th>Comments</th>
                <th>Downloads</th>
            </tr>
            <tr>
                <td>${g}</td>
                <td>${h}</td>
                <td>${p}</td>
                <td>${y}</td>
            </tr>
        </table>
        </a>
        </li>`}function o(t){return t.map(i).join("")}const e=o(r);s.insertAdjacentHTML("beforeend",e)}const f=document.querySelector(".form"),c=document.querySelector(".images"),a=document.querySelector(".loader-container");f.addEventListener("submit",P);function P(s){if(s.preventDefault(),c.innerHTML=" ",l.q=f.elements.search.value.trim(),l.q===""){u.error({title:" ",message:"Sorry, there are no images matching your search query. Please try again!",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}a.style.display="block",C(l.q).then(r=>{if(a.style.display="block",r.hits[0]===void 0){a.style.display="none",u.error({title:" ",message:"Sorry, there are no images matching your search query. Please try again!",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}q(c,r.hits),a.style.display="none",c.addEventListener("click",i);function i(o){if(o.preventDefault(),o.target.nodeName!=="IMG")return;new b(".image-item a",{captionsData:"alt"}).refresh()}f.reset()}).catch(r=>{console.log(r),a.style.display="none"})}
//# sourceMappingURL=index.js.map
