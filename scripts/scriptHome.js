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

const createAlbum = function (where, object) {
  where.innerHTML += `<div class="col-4  ">
  <div class="albumOrizzontali m-1">
    <div class="row g-0">
      <div class="col-md-4">
        <img src=${object.album.cover_small} class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 idalbum="${object.album.id}" onclick=altraPag(event) class="card-title">${object.album.title}</h5>
          <p class="d-none idAlbum">
          ${object.album.id}
        </p>
        
        </div>
      </div>
    </div>
    </div>
  </div>`;
};

const createCards = function (where, object) {
  where.innerHTML += `<div class="col col-3 mysong">
    <div class="card">
      <img src=${object.album.cover_medium} class="card-img-top" alt="album cover" />
      <div class="card-body">
        <h5 idalbum="${object.album.id}" onclick=altraPag(event) class="card-title">${object.title}</h5>
        <p class="card-text">
          ${object.album.title}
        </p>
        
      </div>
    </div>
  </div>`;
};

const createFirstSong = function (where, object) {
  where.innerHTML += `<div class="col">
    <div class="card mb-3 border-0 mainPageBg">
      <div class="row g-0">
        <div class="col-md-3 d-flex justify-content-center align-items-center bg-trasparent">
          <img
            src=${object.album.cover_big}
            class="img-fluid"
            alt="album cover"
          />
        </div>
        <div class="col-md-9 mainPageBg">
          <div
            class="d-flex flex-column justify-content-between h-100 ps-3"
          >
            <p class="">ALBUM</p>
            <h5 idalbum="${object.album.id}" onclick=altraPag(event) class="clickableAlbum">${object.album.title}</h5>
            <p idartist="${object.artist.id}" onclick=caricaArtista(event) class="clickableArtist"">${object.artist.name}</p>
            <p class="subtitle">Ascolta il nuovo singolo dei ${object.artist.name}!</p>
            <p>
              <button class="button-green" role="button">Play</button> <button class="button-green" role="button">Salva</button>
              <button class="button-green" role="button">...</button>
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
    createAlbum(contenitoreAlbum, album[5]);
  } catch (error) {
    console.log(error);
  }
};
Album2();
const Album3 = async function () {
  try {
    let album = await fetchUrl("pink");
    createAlbum(contenitoreAlbum, album[0]);
    createAlbum(contenitoreAlbum, album[9]);
    createAlbum(contenitoreAlbum, album[15]);
  } catch (error) {
    console.log(error);
  }
};
Album3();
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

// search
const contenitorePrincipale = document.getElementById("contenitorePrincipale");
const contenitoreRicerca = document.getElementById("");
const search = async function () {
  const inputSearch = document.getElementById("ricerca");

  const query = inputSearch.value;
  contenitorePrincipale.classList.add("d-none");
  contenitoreRicerca.classList.remove("d-none");

  const risultati = await fetchUrl(query);

  risultati.forEach((song) => {
    createCards(contenitoreRicerca, song);
  });
};

const closeFriends_btn = document.querySelector(".show-friends");

const showFriends = function () {
  const aside = document.querySelector("aside");
  aside.classList.toggle("d-none");
};

closeFriends_btn.onclick = showFriends;
