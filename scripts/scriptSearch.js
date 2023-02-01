// friends section
const closeFriends_btn = document.querySelector(".show-friends");

const showFriends = function () {
  const aside = document.querySelector("aside");
  aside.classList.toggle("d-none");
};

closeFriends_btn.onclick = showFriends;

// create card album

const createCards = function (where, object) {
  where.innerHTML += `<div class="col col-6 col-sm-4 col-md-3 mysong">
    <div class="card m-2 mb-5">
      <img src=${
        object.album.cover_medium
      } class="card-img-top" alt="album cover" />
      <div class="card-body pt-2">
        <h5 idalbum="${
          object.album.id
        }" onclick=altraPag(event) class="card-title">${object.title.toLowerCase()}</h5>
        <p class="card-text ">
          ${object.album.title.toLowerCase()}
        </p>
        
      </div>
    </div>
  </div>`;
};
// search
const search_icon = document.querySelector(".search-icon");
const search = async function () {
  const search_results = document.querySelector(".results");
  search_results.innerHTML = ``;
  let input = document.querySelector(".searchBar");
  console.log(input.value);
  let res = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + input.value
  );
  let data = await res.json();
  console.log(data);

  data.data.forEach((card) => {
    createCards(search_results, card);
  });
};

search_icon.onclick = search;
