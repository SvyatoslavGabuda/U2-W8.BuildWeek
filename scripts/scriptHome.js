const ulrDeezer = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const contenitoreFirstSong = document.getElementById("firstSong");
const contenitoreAlbum = document.getElementById("albums");
const contenitoreAltro = document.getElementById("altro");

const altraPag = function (event) {
  console.log(event.target.getAttribute("idalbum"));
  location.assign(
    //apicistorti
    `../pages/pag1.html?id=${event.target.getAttribute("idalbum")}`
  );
};

const returnMinute = function (sec) {
  const minute = Math.floor(sec / 60);
  const restSeconds = sec - minute * 60;
  const time = `${minute}:${restSeconds}`;
  return time;
};

const caricaArtista = function (event) {
  console.log(event);
  location.assign(
    //apicistorti
    `../pages/artist.html?id=${event.target.getAttribute("idartist")}`
  );
};

const playHover = function (event) {
  console.log("ciao", event.target);
  // const btn = document.querySelector("");
};

const createAlbum = function (where, object) {
  where.innerHTML += `<div class="col ">
  <div onmouseover=playHover(event) class="albumOrizzontali m-1">
    <div class="row g-0">
      <div class="col-2">
        <img idalbum="${object.album.id}" onclick=altraPag(event) src=${object.album.cover_small} class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-10 d-flex align-items-center">
        <div class="card-body d-flex align-item-center justify-content-between">
          <h5 idalbum="${object.album.id}" onclick=altraPag(event) class="card-title ps-1">${object.album.title}</h5>
          
        <button class="play"><i class="bi bi-play-circle-fill"></i></button>
        
        </div>
      </div>
    </div>
    </div>
  </div>`;
};

const createCards = function (where, object) {
  where.innerHTML += `<div class="col col-6 col-sm-3  mysong">
    <div class="card">
      <img idalbum="${object.album.id}" onclick=altraPag(event) src=${
    object.album.cover_medium
  } class="card-img-top" alt="album cover" />
      <div class="card-body pt-4">
        <h5  class="card-title">${object.title.toLowerCase()}</h5>
        <p class="card-text ">
          ${object.album.title.toLowerCase()}
        </p>
        
      </div>
    </div>
  </div>`;
};

const createFirstSong = function (where, object) {
  where.innerHTML += `<div class="col ">
    <div class="card mb-3 border-0 mainPageBg">
      <div class="row g-0 p-4">
        <div class="col-md-3 d-flex justify-content-center align-items-center bg-trasparent">
          <img
            src=${object.album.cover_big}
            class="img-fluid"
            alt="album cover"
          />
        </div>
        <div class="col-md-9 ">
          <div
            class="d-flex flex-column justify-content-between h-100 ps-3"
          >
            <p class="">ALBUM</p>
            <h5 idalbum="${object.album.id}" onclick=altraPag(event) class="clickableAlbum">${object.album.title}</h5>
            <p idartist="${object.artist.id}" onclick=caricaArtista(event) class="clickableArtist"">${object.artist.name}</p>
            <p class="subtitle">Ascolta il nuovo singolo dei ${object.artist.name}!</p>
            <p>
              <button class="button-green" role="button">Play</button> <button class="button-black" role="button">Salva</button>
              <button class="button-black" role="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg></button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
};

const fetchUrl = async function (search) {
  try {
    let res = await fetch(`${ulrDeezer}${search}`);
    if (res.ok) {
      const { data } = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const Album1 = async function () {
  try {
    let album = await fetchUrl("backinblack");
    createAlbum(contenitoreAlbum, album[0]);
  } catch (error) {
    console.log(error);
  }
};
Album1();
const Album2 = async function () {
  try {
    let album = await fetchUrl("FooFighter");
    createAlbum(contenitoreAlbum, album[0]);
  } catch (error) {
    console.log(error);
  }
};
Album2();
const Album3 = async function () {
  try {
    let album = await fetchUrl("Pink Floyd");
    createAlbum(contenitoreAlbum, album[0]);
  } catch (error) {
    console.log(error);
  }
};
Album3();
const Album4 = async function () {
  try {
    let album = await fetchUrl("system of a down");
    createAlbum(contenitoreAlbum, album[0]);
  } catch (error) {
    console.log(error);
  }
};
Album4();
const Album5 = async function () {
  try {
    let album = await fetchUrl("nickelback");
    createAlbum(contenitoreAlbum, album[0]);
  } catch (error) {
    console.log(error);
  }
};
Album5();
const Album6 = async function () {
  try {
    let album = await fetchUrl("My Chemical Romance");
    createAlbum(contenitoreAlbum, album[0]);
  } catch (error) {
    console.log(error);
  }
};
Album6();

const artista = async function () {
  try {
    let artista = await fetchUrl("maneskin");

    console.log(artista);
    const brani = [];
    artista.forEach((element) => {
      createCards(contenitoreAltro, element);
      brani.push(element);
    });

    const allMySongs = document.querySelectorAll(".mysong");

    for (let i = 0; i < allMySongs.length; i++) {
      if (i > 3) {
        allMySongs[i].classList.add("d-none");
      }
    }
    const showAllBtn = document.getElementById("showAll");
    const hideBtn = document.getElementById("hide");
    const show = function () {
      allMySongs.forEach((el) => {
        el.classList.remove("d-none");
      });
      showAllBtn.classList.add("d-none");
      hideBtn.classList.remove("d-none");
    };
    showAllBtn.onclick = show;
    const hide = function () {
      for (let i = 0; i < allMySongs.length; i++) {
        if (i > 3) {
          allMySongs[i].classList.add("d-none");
        }
      }
      showAllBtn.classList.remove("d-none");
      hideBtn.classList.add("d-none");
    };
    hideBtn.onclick = hide;

    createFirstSong(contenitoreFirstSong, artista[0]);
  } catch (error) {
    console.log(error);
  }
};
artista();

const closeFriends_btn = document.querySelector(".show-friends");

const showFriends = function () {
  const aside = document.querySelector("aside");
  // aside.classList.toggle("d-none");
  aside.classList.toggle("d-lg-block");
};

closeFriends_btn.onclick = showFriends;
