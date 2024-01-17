const key = 'YiGIYhWsP6H4tBD8XxxEUhH1PIIt3Cbv0VO1A3AVMqM'
const search = document.querySelector("#search-input");
const submit = document.querySelector("#search-btn");
const form = document.querySelector("form");
const results = document.querySelector(".search-reults");
const showMore = document.querySelector("#show-more");

let inpData = "";
let page = 1;

const searchImages = async ()=>{
  inpData = search.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inpData}&client_id=${key}`;
  let response = await fetch(url);
  let data = await response.json();
  const res = data.results;

  if(page===1){
    results.innerHTML = "";
  }
  res.map((resu)=>{
     const newRes = document.createElement('div');
     newRes.classList.add('search-result');
     const img = document.createElement('img');
     img.src = resu.urls.small;
     img.alt = resu.alt_description;
     const link = document.createElement('a');
     link.href = resu.links.html;
     link.target = "_blank";
     link.textContent = resu.alt_description;
     newRes.appendChild(img);
     newRes.appendChild(link);
     results.appendChild(newRes);
    });
    page++;
    if(page>1){
      showMore.style.display = "block";
    }
}
form.addEventListener("submit",(eve)=>{
  eve.preventDefault();
  page = 1;
  searchImages();
});
showMore.addEventListener("click",()=>{
  searchImages();
});

