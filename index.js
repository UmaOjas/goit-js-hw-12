import{a as u,i as d,S}from"./assets/vendor-CRCB-GUD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const w="https://pixabay.com",m="/api/";u.defaults.baseURL=w;const H="45940755-86be6da0f1a4750ab3bd13574",s={key:H,q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:15};async function q(o){try{return s.page=1,(await u.get(m,{params:s})).data}catch(r){console.log(r)}}async function v(){try{return(await u.get(m,{params:s})).data}catch(o){console.log(o)}}function p(o,r){function a({webformatURL:t,largeImageURL:l,tags:y,likes:b,views:L,comments:C,downloads:x}){return`<li class="image-item">
        <a href="${l}">
        <img
        class="search-image"
        src="${t}"
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
        </li>`}function n(t){return t.map(a).join("")}const e=n(r);o.insertAdjacentHTML("beforeend",e)}const h=document.querySelector(".form"),g=document.querySelector(".images"),f=document.querySelector(".loader-container"),c=document.querySelector(".load-btn");i("hide");h.addEventListener("submit",z);async function z(o){if(o.preventDefault(),g.innerHTML=" ",s.q=h.elements.search.value.trim(),s.q===""){i("hide"),d.error({title:" ",message:"Sorry, there are no images matching your search query. Please try again!",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}try{let e=function(t){if(t.preventDefault(),t.target.nodeName!=="IMG")return;new S(".image-item a",{captionsData:"alt"}).refresh()};s.page=1;const r=await q(s.q);if(f.style.display="block",s.page+=1,r.hits[0]===void 0){f.style.display="none",i("hide"),d.error({title:" ",message:"Sorry, there are no images matching your search query. Please try again!",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}p(g,r.hits),f.style.display="none";const a=r.totalHits,n=Math.ceil(a/s.per_page);if(s.page>=n){i("hide"),d.error({title:" ",message:"We're sorry, but you've reached the end of search results.",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}else i("show"),c.addEventListener("click",M);g.addEventListener("click",e),h.reset()}catch(r){console.log(r),f.style.display="none"}}async function M(){try{f.style.display="block",i("disabled");const o=await v();s.page+=1,p(g,o.hits),f.style.display="none";const r=o.totalHits,a=Math.ceil(r/s.per_page);if(s.page>a){i("hide"),d.error({title:" ",message:"We're sorry, but you've reached the end of search results.",titleSize:"16px",titleLineHeight:"24px",messageColor:"white",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#ef4040",iconColor:"#ffffff",titleColor:"#ffffff",messageColor:"#ffffff",close:!1,position:"topRight"});return}else i()}catch(o){console.log(o)}}function i(o){o==="hide"?c.classList.add("hide"):o==="show"?c.classList.remove("hide"):o==="disable"?c.disabled=!0:c.disabled=!1}
//# sourceMappingURL=index.js.map
