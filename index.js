import{a as u,i as g,S as w}from"./assets/vendor-CRCB-GUD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const H="https://pixabay.com",y="/api/";u.defaults.baseURL=H;const q="45940755-86be6da0f1a4750ab3bd13574",s={key:q,q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:15};async function v(t){try{return s.page=1,(await u.get(y,{params:s})).data}catch(r){console.log(r)}}async function z(){try{return(await u.get(y,{params:s})).data}catch(t){console.log(t)}}function b(t,r){function n({webformatURL:o,largeImageURL:a,tags:d,likes:p,views:C,comments:S,downloads:x}){return`<li class="image-item">
        <a href="${a}">
        <img
        class="search-image"
        src="${o}"
        alt="${d}" />
        <table class="image-table">
            <tr>
                <th>Likes</th>
                <th>Views</th>
                <th>Comments</th>
                <th>Downloads</th>
            </tr>
            <tr>
                <td>${p}</td>
                <td>${C}</td>
                <td>${S}</td>
                <td>${x}</td>
            </tr>
        </table>
        </a>
        </li>`}function c(o){return o.map(n).join("")}const e=c(r);t.insertAdjacentHTML("beforeend",e)}const m=document.querySelector(".form"),h=document.querySelector(".images"),l=document.querySelector(".loader-container"),f=document.querySelector(".load-btn");let L;m.addEventListener("submit",M);async function M(t){if(i("hide"),t.preventDefault(),h.innerHTML=" ",s.q=m.elements.search.value.trim(),s.q===""){i("hide"),g.error({title:" ",message:"Sorry, there are no images matching your search query. Please try again!",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}try{let a=function(d){if(d.preventDefault(),d.target.nodeName!=="IMG")return;new w(".image-item a",{captionsData:"alt"}).refresh()};s.page=1;const r=await v(s.q);if(l.style.display="block",s.page+=1,r.hits[0]===void 0){l.style.display="none",i("hide"),g.error({title:" ",message:"Sorry, there are no images matching your search query. Please try again!",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}b(h,r.hits),L=document.querySelector(".image-item").getBoundingClientRect().height*2,l.style.display="none";const e=r.totalHits;console.log(e);const o=Math.ceil(e/s.per_page);if(s.page>o){i("hide"),g.error({title:" ",message:"We're sorry, but you've reached the end of search results.",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}else i("show"),f.addEventListener("click",P);h.addEventListener("click",a),m.reset()}catch(r){console.log(r),l.style.display="none"}}async function P(){try{l.style.display="block",i("disabled");const t=await z();s.page+=1,b(h,t.hits),window.scrollBy({top:L,behavior:"smooth"}),l.style.display="none";const r=t.totalHits,n=Math.ceil(r/s.per_page);if(s.page>n){i("hide"),g.error({title:" ",message:"We're sorry, but you've reached the end of search results.",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}else i()}catch(t){console.log(t)}}function i(t){t==="hide"?f.classList.add("hide"):t==="show"?f.classList.remove("hide"):t==="disable"?f.disabled=!0:f.disabled=!1}
//# sourceMappingURL=index.js.map
