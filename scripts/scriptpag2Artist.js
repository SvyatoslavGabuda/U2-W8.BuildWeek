const ulrArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist";

let params = new URLSearchParams(location.search);
console.log(params);

let ourIDArtist = params.get("id");
console.log(ourIDArtist);

const returnMinute = function (sec) {
  const minute = Math.floor(sec / 60);
  const restSeconds = sec - minute * 60;
  const time = `${minute}:${restSeconds}`;
  return time;
};

const doveMettoArtista = document.getElementById("artistaCaricato");
const fetchUrlArtist = async function () {
  try {
    let res = await fetch(`${ulrArtist}/${ourIDArtist}`);
    if (res.ok) {
      const artista = await res.json();
      // console.log(data);
      let tracklist = await fetch(artista.tracklist);
      console.log(tracklist);
      const tracks = await tracklist.json();
      console.log(tracks);
      console.log(tracks.data);

      doveMettoArtista.innerHTML += `
       <div class="position-relative pt-4 intestazioneArtist">
              <div class="col-12 z-0">
                <img
                  class="img-fluid"
                  src=${artista.picture_big}
                  alt="album Cover"
                />
              </div>
              <div class="col-12 z-1">
                
                <h5>${artista.name}</h5>
                <p>${artista.nb_fan}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button><i class="bi bi-play-circle"></i></button>
                
                <button>FOLLOWING</button>
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

      //   const tracks = data.tracks.data;

      tracks.data.forEach((el, index) => {
        doveMettoArtista.innerHTML += `
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
                  <p>${returnMinute(el.duration)}</p>
                </div>
              </div>`;
      });

      return artista;
    }
  } catch (error) {
    console.log(error);
  }
};
fetchUrlArtist();
