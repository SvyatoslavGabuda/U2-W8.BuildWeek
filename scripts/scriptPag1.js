console.log("pag1");
let params = new URLSearchParams(location.search);
console.log(params);

let ourID = params.get("id");
console.log(ourID);

const doveMettiAlbum = document.getElementById("albumCaricati");

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
                <p>${data.artist.name}, ${data.release_date},${
        data.tracks.data.length
      } tracce, ${Math.floor(data.duration / 60)} min</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button>play</button>
                <button>cuore</button>
                <button>freccia in basso</button>
                <button>...</button>
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
                  <p>${el.artist.name}</p>
                </div>
              </div>
              <div class="col-3">
                <p>${el.rank}</p>
              </div>
              <div class="col-2">
                <p>${Math.floor(el.duration / 60)}</p>
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
