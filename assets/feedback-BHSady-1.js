import{a as d,S as l,N as f,P as u}from"./vendor-uxFXHuDx.js";import{r as n}from"../index.js";function g(){return n.loaderFeedback.classList.add("loader")}function i(){return n.loaderFeedback.classList.remove("loader")}const a=document.querySelector(".swiper-buttons");function h(t){const e=[...t];for(let s=e.length-1;s>0;s-=1){const r=Math.floor(Math.random()*(s+1));[e[s],e[r]]=[e[r],e[s]]}return e}function p(t){const e=t%1,s=Math.floor(t);return e>=.3&&e<=.7?s+.5:e>=.8?s+1:e<=.2?s:t}function w(){document.querySelectorAll(".star-rating").forEach(e=>{const s=parseFloat(e.dataset.rating);v(e,s)})}function v(t,e){let s="";for(let r=1;r<=5;r++)r<=Math.floor(e)?s+=`
        <svg class="icon-star star-filled" width="20" height="20">

          <use href="./star-rating.icons.svg#star-filled"></use>

        </svg>`:r-.5===e?s+=`
        <svg class="icon-star star-half" width="20" height="20">

          <use href="./star-rating.icons.svg#star-half"></use>

        </svg>`:s+=`
        <svg class="icon-star star-empty" width="20" height="20">
          <use href="./star-rating.icons.svg#star-empty"></use>
        </svg>`;t.innerHTML=s}function b(t){const e=document.querySelector("#reviews-container"),s=t.map(({name:r,descr:o,rate:c})=>`
      <div class="swiper-slide review-card">
        <div class="star-rating" data-rating="${p(c)}"></div>
        <p class="feedback-text">${o}</p>
        <h3 class="feedback-user-name">${r}</h3>
      </div>`).join("");e.innerHTML=s,w()}function m(){new l(".reviews-swiper",{modules:[f,u],observer:!0,observeParents:!0,slidesPerView:1,spaceBetween:10,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",disabledClass:"button-disabled"},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:3}}})}async function k(){g(),a==null||a.classList.add("hidden");try{const e=(await d.get("https://furniture-store-v2.b.goit.study/api/feedbacks")).data,s=e.feedbacks;if(s&&Array.isArray(s)){const r=h(s);b(r.slice(0,10)),m(),a==null||a.classList.remove("hidden")}else iziToast.show({message:`Масив не знайдено в data.feedbacks: ${e}`,color:"red",position:"topCenter"}),i()}catch(t){i(),iziToast.show({message:`Помилка при отриманні відгуків: ${t}`,color:"red",position:"topCenter"})}i()}k();
//# sourceMappingURL=feedback-BHSady-1.js.map
