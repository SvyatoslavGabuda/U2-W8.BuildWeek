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
const aggiungiPreferiti = function (event) {
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
       <div class="row">
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
                <p idartist="${data.artist.id}" onclick=caricaArtista(event)>${
        data.artist.name
      }, ${data.release_date},${data.tracks.data.length} tracce, ${returnMinute(
        data.duration
      )} min</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button><i class="bi bi-play-circle"></i></button>
                <button idalbum="${
                  data.id
                }" onclick=aggiungiPreferiti(event) ><i class="bi bi-heart"></i></button>
                <button><i class="bi bi-arrow-down-circle"></i></button>
                <button><i class="bi bi-three-dots"></i></button>
              </div>
            </div>
            <div class="row">
              <div class="col-1">
                <p>#</p>
              </div>
              <div class="col-6">
                <p>TITOLO</p>
              </div>
              <div class="col-3">
                <p>RIPRODUZIONI</p>
              </div>
              <div class="col-2">
                <p>DURATA</p>
              </div>
            </div>`;

      const tracks = data.tracks.data;

      tracks.forEach((el, index) => {
        doveMettiAlbum.innerHTML += `
        <div class="row">
              <div class="col d-flex">
                <div class="col-1">
                  <p>${index + 1}</p>
                </div>
                <div class="col-6">
                  <p>${el.title}</p>
                  <p idartist="${el.artist.id}" onclick=caricaArtista(event)>${
          el.artist.name
        }</p>
                </div>
              </div>
              <div class="col-3">
                <p>${el.rank}</p>
              </div>
              <div class="col-2">
                <p>${returnMinute(el.duration)}</p>
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
