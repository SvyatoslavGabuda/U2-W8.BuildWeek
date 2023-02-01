const ulrArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist";

let params = new URLSearchParams(location.search);
// console.log(params);

let ourIDArtist = params.get("id");
// console.log(ourIDArtist);

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
      // console.log(artista);
      let tracklist = await fetch(artista.tracklist);
      // console.log(tracklist);
      const tracks = await tracklist.json();
      // console.log(tracks);
      // console.log(tracks.data);

      doveMettoArtista.innerHTML += `
       <div class="row pt-4 ">

             <div style="background-image: url(${artista.picture_big}) ;" class="intestazioneArtist">

              
                
              

             
             <p> <i class="bi bi-shield-fill-check"></i> Artista verificato</p>
                <h5>${artista.name}</h5>
                <p>${artista.nb_fan} ascoltatori mensili</p>
              

            </div>

            </div>
            
            <div class="row">
              <div class="col-12 bottoniArtista ">
                <button class="play"><i class="bi bi-play-circle-fill"></i></button>
                
                <button class="follow">FOLLOWING</button>
                <button><i class="bi bi-three-dots"></i></button>
              </div>
            </div>

            <div class="row">
            <div class="col-7">

             <h2 class="text-light">Popolari</h2>
             </div>
             <div class="col-5">
             <h2 class="text-light">Brani che ti piacciono</h2>
             </div>

            </div>`;

      //   const tracks = data.tracks.data;

      const contrainerTracce = document.getElementById("tracce");
      const containerBraniPreferiti = document.getElementById("braniPreferiti");
      containerBraniPreferiti.innerHTML += `<div class="row p-0 braniPreferiti">
      <div class="col-3 position-relative"><img src=${artista.picture_small} alt="" />
      <span ><i class="bi bi-check-circle-fill"></i></span></div>
      <div class="col-9 d-flex flex-column justify-content-center">
        <h5>Hai messo Mi piace a ${artista.nb_album} Brani</h5>
        <p>Di ${artista.name}</p>
      </div>
    </div>


      `;

      tracks.data.forEach((el, index) => {
        contrainerTracce.innerHTML += `
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
