console.log("pag1");
let params = new URLSearchParams(location.search);
console.log(params);

let ourID = params.get("id");
console.log(ourID);

const doveMettiAlbum = document.getElementById("albumCaricati");

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
const preferiti = [];
window.onload = () => {
  const arrayOfID = JSON.parse(localStorage.getItem("preferiti"));
  arrayOfID.forEach((el) => {
    preferiti.push(el);
  });
};
const aggiungiPreferiti = function (event) {
  console.log("cliccato");
  console.log(event);
  preferiti.push(event.target.getAttribute("idalbum"));
  console.log(event.target.getAttribute("idalbum"));
  console.log(preferiti);
  localStorage.setItem("preferiti", JSON.stringify(preferiti));
};

const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album";
const fetchUrlAlbum = async function () {
  try {
    let res = await fetch(`${urlAlbum}/${ourID}`);
    if (res.ok) {
      const data = await res.json();

      doveMettiAlbum.innerHTML += `
      <div class="position-absolute top-0 sfondo">
                <img
                  
                  src=${data.cover_big}
                  alt="album Cover"
                />
              </div>`;

      doveMettiAlbum.innerHTML += `
       <div class="row intestazioneAlbum text-light">
              <div class="col-3">
                <img
                  class="img-fluid"
                  src=${data.cover_big}
                  alt="album Cover"
                />
              </div>
              <div class="col-9">
                <p>ALBUM</p>
                <h5>${data.title}</h5>
                <p > <span><img
                class="img-fluid"
                src=${data.artist.picture_small}
                alt="album Cover"
              /> </span><span idartist="${
                data.artist.id
              }" onclick=caricaArtista(event)>${data.artist.name}</span>, ${
        data.release_date
      },${data.tracks.data.length} tracce, ${returnMinute(
        data.duration
      )} min</p>
              </div>
            </div>
            <div class="row ">
              <div class="col-12 bottoniAlbum">
                <button class=" play"><i class="bi bi-play-circle-fill"></i></button>
                <button  id="save" idalbum="${
                  data.id
                }" onclick=aggiungiPreferiti(event) ><i idalbum="${
        data.id
      }" class="bi bi-heart"></i></button>
                <button><i class="bi bi-arrow-down-circle"></i></button>
                <button><i class="bi bi-three-dots"></i></button>
              </div>
            </div>
            <div class="row intestazioneTracceAlbum">
              <div class="col-1 d-flex justify-content-center">
                <p>#</p>
              </div>
              <div class="col-5">
                <p>TITOLO</p>
              </div>
              <div class="col-3">
                <p class="text-end pe-3">RIPRODUZIONI</p>
              </div>
              <div class="col-3">
                <p class="text-end pe-4"><i class="bi bi-clock"></i></p>
              </div>
            </div>`;

      // onclick=aggiungiPreferiti(event)
      // const saveBtn = document.getElementById("save");
      // console.log(saveBtn);
      // const aggiungiPreferiti = function (event) {
      //   preferiti.push(event.target.getAttribute("idalbum"));
      //   console.log(event.currentTarget.getAttribute("idalbum"));
      //   console.log(preferiti);
      //   localStorage.setItem("preferiti", JSON.stringify(preferiti));
      // };
      // saveBtn.onclick = aggiungiPreferiti;

      const tracks = data.tracks.data;

      tracks.forEach((el, index) => {
        doveMettiAlbum.innerHTML += `
        <div class="row tracceAlbum">
              
                <div class="col-1 d-flex justify-content-center align-items-center ">
                  <p>${index + 1}</p>
                </div>
                <div class="col-5">
                  <p >${el.title}</p>
                  <p  idartist="${el.artist.id}" onclick=caricaArtista(event)>${
          el.artist.name
        }</p>
                
              </div>
              <div class="col-3">
                <p class="text-end pe-3">${el.rank}</p>
              </div>
              <div class="col-3">
                <p class="text-end pe-4">${returnMinute(el.duration)}</p>
              </div>
            </div>`;
      });

      console.log(data);

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
fetchUrlAlbum();

const closeFriends_btn = document.querySelector(".show-friends");

const showFriends = function () {
  const aside = document.querySelector("aside");
  aside.classList.toggle("d-none");
};

closeFriends_btn.onclick = showFriends;
