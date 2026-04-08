import{a as n,S as o,N as c,P as d}from"./vendor-uxFXHuDx.js";function l(t){const e=[...t];for(let s=e.length-1;s>0;s-=1){const r=Math.floor(Math.random()*(s+1));[e[s],e[r]]=[e[r],e[s]]}return e}function f(t){const e=t%1,s=Math.floor(t);return e>=.3&&e<=.7?s+.5:e>=.8?s+1:e<=.2?s:t}function u(){document.querySelectorAll(".star-rating").forEach(e=>{const s=parseFloat(e.dataset.rating);g(e,s)})}function g(t,e){let s="";for(let r=1;r<=5;r++)r<=Math.floor(e)?s+=`
        <svg class="icon-star star-filled" width="20" height="20">

          <use href="./star-rating.icons.svg#star-filled"></use>

        </svg>`:r-.5===e?s+=`
        <svg class="icon-star star-half" width="20" height="20">

          <use href="./star-rating.icons.svg#star-half"></use>

        </svg>`:s+=`
        <svg class="icon-star star-empty" width="20" height="20">
          <use href="./star-rating.icons.svg#star-empty"></use>
        </svg>`;t.innerHTML=s}function p(t){const e=document.querySelector("#reviews-container"),s=t.map(({name:r,descr:a,rate:i})=>`
      <div class="swiper-slide review-card">
        <div class="star-rating" data-rating="${f(i)}"></div>
        <p class="feedback-text">${a}</p>
        <h3 class="feedback-user-name">${r}</h3>
      </div>`).join("");e.innerHTML=s,u()}function h(){new o(".reviews-swiper",{modules:[c,d],observer:!0,observeParents:!0,slidesPerView:1,spaceBetween:10,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",disabledClass:"button-disabled"},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:3}}})}async function v(){try{const e=(await n.get("https://furniture-store-v2.b.goit.study/api/feedbacks")).data,s=e.feedbacks;if(s&&Array.isArray(s)){const r=l(s);p(r.slice(0,10)),h()}else iziToast.show({message:`Масив не знайдено в data.feedbacks: ${e}`,color:"red",position:"topCenter"})}catch(t){iziToast.show({message:`Помилка при отриманні відгуків: ${t}`,color:"red",position:"topCenter"})}}v();
//# sourceMappingURL=feedback-Bgycbb9I.js.map
