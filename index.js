import{a as u,i as d,S}from"./assets/vendor-CRCB-GUD.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function f(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=f(t);fetch(t.href,e)}})();function m(r,o){function f({webformatURL:e,largeImageURL:i,tags:y,likes:b,views:L,comments:C,downloads:x}){return`<li class="image-item">
        <a href="${i}">
        <img
        class="search-image"
        src="${e}"
        alt="${y}" />
        <table class="image-table">
            <tr>
                <th>Likes</th>
                <th>Views</th>
                <th>Comments</th>
                <th>Downloads</th>
            </tr>
            <tr>
                <td>${b}</td>
                <td>${L}</td>
                <td>${C}</td>
                <td>${x}</td>
            </tr>
        </table>
        </a>
        </li>`}function a(e){return e.map(f).join("")}const t=a(o);r.insertAdjacentHTML("beforeend",t)}const w="https://pixabay.com",p="/api/";u.defaults.baseURL=w;const q="45940755-86be6da0f1a4750ab3bd13574",s={key:q,q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:15};async function H(r){try{return s.page=1,(await u.get(p,{params:s})).data}catch(o){console.log(o)}}async function v(){try{console.log(s.page);const r=await u.get(p,{params:s});return s.page+=1,r.data}catch(r){console.log(r)}}const h=document.querySelector(".form"),g=document.querySelector(".images"),n=document.querySelector(".loader-container"),c=document.querySelector(".load-btn");l("hide");h.addEventListener("submit",z);async function z(r){if(r.preventDefault(),g.innerHTML=" ",s.q=h.elements.search.value.trim(),s.q===""){l("hide"),d.error({title:" ",message:"Sorry, there are no images matching your search query. Please try again!",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}try{let t=function(e){if(e.preventDefault(),e.target.nodeName!=="IMG")return;new S(".image-item a",{captionsData:"alt"}).refresh()};const o=await H(s.q);if(n.style.display="block",o.hits[0]===void 0){n.style.display="none",l("hide"),d.error({title:" ",message:"Sorry, there are no images matching your search query. Please try again!",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}m(g,o.hits),n.style.display="none";const f=o.totalHits,a=Math.ceil(f/s.per_page);if(s.page>=a){l("hide"),d.error({title:" ",message:"We're sorry, but you've reached the end of search results.",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}else{l("show"),s.page+=1,c.addEventListener("click",e);async function e(){try{n.style.display="block";const i=await v();if(m(g,i.hits),n.style.display="none",s.page>a){console.log(s.page),l("hide"),d.error({title:" ",message:"We're sorry, but you've reached the end of search results.",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}}catch(i){console.log(i)}}}g.addEventListener("click",t),h.reset()}catch(o){console.log(o),n.style.display="none"}}function l(r){r==="hide"?c.classList.add("hide"):r==="show"?c.classList.remove("hide"):r==="disable"?c.disabled=!0:c.disabled=!1}
//# sourceMappingURL=index.js.map
