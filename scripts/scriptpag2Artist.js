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
       <div class="row pt-4 ">

             <div style="background-image: url(${artista.picture_big}) ;" class="intestazioneArtist">

              
                
              

             
             <p> <i class="bi bi-shield-fill-check"></i> Artista verificato</p>
                <h5>${artista.name}</h5>
                <p>${artista.nb_fan} ascoltatori mensili</p>
              

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

             <h2 class="text-light">Popolari</h2>
            </div>`;

      //   const tracks = data.tracks.data;

      tracks.data.forEach((el, index) => {
        doveMettoArtista.innerHTML += `
          <div class="row tracceArtista">
                
                  <div class="col-1 d-flex justify-content-center align-items-center ">
                    <p>${index + 1}</p>
                  </div>
                  <div class="col-5">
                  
                    <p><span><img
                    class="img-fluid"
                    src=${el.album.cover_small}
                    alt="album Cover"
                  /> </span>${el.title}</p>
                    
                
                </div>
                <div class="col-3">
                  <p class="text-end pe-3">${el.rank}</p>
                </div>
                <div class="col-3">
                  <p class="text-end pe-4">${returnMinute(el.duration)}</p>
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
