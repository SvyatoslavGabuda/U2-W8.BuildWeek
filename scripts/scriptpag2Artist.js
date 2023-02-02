const ulrArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist";
const playlistLida = document.getElementById("playlistLidia");
const playlistNames = [
  "Grazie a Lidia per la playlist <3",
  "Be The Young Seasons 1-5",
  "Be The Young Seasons 6-8",
  "persona di m*rda (gen-feb 2023)",
  "Musical 2022",
  "pippo, pluto e paperino (nov-dec 2022)",
  "early stage emily syndrome (sett-ott 2022)",
  "Be the young",
  "'...' cit. Kimiko (lug-ago 2022)",
  "saggio vibes 💃🩰",
  "main character energy (mag-giu 2022)",
  "that fucking mood 🔪☠️",
  "VEE, CARLOTTA E GIACOMO VANNO A BOSIO",
  "An Emily Winchester kind of mood 🔪🖕",
  "landing page (mar-apr 2022)",
  "2021 lol",
  "cosa cazzo vuol dire questa affermazione (gen-feb 2022)",
  "honey and glass (nov-dic 2021)",
  "(Revenge) Training Arc 🦍",
  "Lidia 🤝 Emily",
  "minecraft e nintendo switch (sep-oct 2021)",
  "silvano d'orba? I hardly know her (lug - ago 2021)",
  "Culo 2021",
  "Frah Quintale Mix",
  "Francesco Guccini Mix",
  "Lo Stato Sociale Mix",
  "chapter 4/? (mag-giu 2021)",
  "Strive School <> The Hunt Motivation",
  "mi stavo dimenticando (mar-apr 2021)",
  "high school musical 1,2,3",
  "quanto trash cazzo",
  "The 2020 Playlist",
  "ma(ncanza) che cazzo ne so io (gen-feb 2021)",
];

playlistNames.forEach((el) => {
  playlistLida.innerHTML += `<li>
  <a href="#">${el}</a>
</li>`;
});

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

              
                
              

             
             <p> <i class="bi bi-patch-check-fill"></i> Artista verificato</p>
                <h5>${artista.name}</h5>
                <p class="mb-3">${artista.nb_fan} ascoltatori mensili</p>
              

            </div>

            </div>
            
            <div class="row ps-4">
              <div class="col-12 bottoniArtista ">
                <button class="play"><i class="bi bi-play-circle-fill"></i></button>
                
                <button class="follow">FOLLOWING</button>
                <button><i class="bi bi-three-dots"></i></button>
              </div>
            </div>

            `;

      //   const tracks = data.tracks.data;

      const contrainerTracce = document.getElementById("tracce");
      const containerBraniPreferiti = document.getElementById("braniPreferiti");
      containerBraniPreferiti.innerHTML += `
      <div class="row p-0 braniPreferiti">
      <div class="col-3 position-relative">
      <img src=${artista.picture_medium} alt="" />
      <span ><i class="bi bi-check-circle-fill"></i></span>
      </div>
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

const closeFriends_btn = document.querySelector(".show-friends");

const showFriends = function () {
  const aside = document.querySelector("aside");
  aside.classList.toggle("d-xl-block");
};

closeFriends_btn.onclick = showFriends;
