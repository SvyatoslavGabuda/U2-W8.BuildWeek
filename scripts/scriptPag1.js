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
  if (localStorage.getItem("preferiti")) {
    arrayOfID.forEach((el) => {
      preferiti.push(el);
    });
  }
};
const aggiungiPreferiti = function (event) {
  console.log("cliccato");
  console.log(event);
  if (preferiti.includes(event.target.getAttribute("idalbum"))) {
    console.log("c'e gia");
  } else {
    preferiti.push(event.target.getAttribute("idalbum"));
    console.log(event.target.getAttribute("idalbum"));
    console.log(preferiti);
    localStorage.setItem("preferiti", JSON.stringify(preferiti));
  }
};
const populatePlayer = function (track) {
  const artist_name = document.querySelector(".track-artist");
  const track_name = document.querySelector(".track-name");
  const audio = document.querySelector("audio");
  const image = document.querySelector(".cover img");

  artist_name.textContent = track.artist.name;
  track_name.textContent = track.title;

  audio.setAttribute("src", track.preview);
  image.setAttribute("src", track.album.cover_medium);
};
let index = 0;

const nextTrack = function (object, index) {
  populatePlayer(object[index]);
  index++;
};

// const playSong = function (song) {
//   let audio = document.querySelector("audio");
//   audio.setAttribute("src", song);
//   console.dir(audio);
// };
// playSong(
//   "https://cdns-preview-9.dzcdn.net/stream/c-9de56c7f6946b36be32c3caa885e46dd-5.mp3"
// );

const playpauseTrack = function () {
  const audio = document.querySelector("audio");
  const play_pause_btn = document.querySelector(".playpause-track");

  if (audio.paused) {
    audio.play();
    play_pause_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pause-circle-fill mx-2" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/>
  </svg>`;
  } else {
    audio.pause();

    play_pause_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-circle-fill mx-2" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
</svg>`;
  }
};

const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album";

const fetchUrlAlbum = async function () {
  try {
    let res = await fetch(`${urlAlbum}/${ourID}`);
    if (res.ok) {
      const data = await res.json();

      // song_track.albumTitle = data.tracks.data[0].album.title;
      // song_track.artist = data.
      // song_track.title = data.tracks.title;

      // console.log(song_track.albumTitle);

      doveMettiAlbum.innerHTML += `
      <div class="position-absolute top-0 sfondo">
                <img
                  
                  src=${data.cover_big}
                  alt="album Cover"
                />
              </div>`;

      doveMettiAlbum.innerHTML += `
       <div class="row intestazioneAlbum text-light flex-column align-items-center flex-md-row">
              <div class="col-8 col-md-3">
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
                <button class="play" onclick=populatePlayer()><i class="bi bi-play-circle-fill"></i></button>
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
      // populatePlayer(tracks[0]);
      nextTrack(tracks, 0);
      // let track = {
      //   title: data.title,
      //   cover: data.cover_small,
      //   artist: data.artist.name,
      //   tracks: [],
      // };
      tracks.forEach((el, index) => {
        // album.tracks[index] = Object.assign({});
        // album.tracks[index].title = el.title_short;
        // album.tracks[index].preview = el.preview;
        // album.tracks[index].duration = el.duration;

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
  aside.classList.toggle("d-lg-block");
};

closeFriends_btn.onclick = showFriends;
