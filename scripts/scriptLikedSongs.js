const containerLikedSongs = document.getElementById("likedSongs");

const createCards = function (where, object) {
  where.innerHTML += `<div class="col col-3 my-2 mysong">
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

const loadLikedSongs = function () {
  const arrayOfID = JSON.parse(localStorage.getItem("preferiti"));

  if (localStorage.getItem("preferiti")) {
    console.log(arrayOfID);
    const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album";
    arrayOfID.forEach((id) => {
      const fetchUrlAlbum = async function () {
        try {
          let res = await fetch(`${urlAlbum}/${id}`);
          if (res.ok) {
            const data = await res.json();
            console.log(data.tracks.data);
            data.tracks.data.forEach((song) => {
              createCards(containerLikedSongs, song);
            });

            return data;
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUrlAlbum();
    });
  } else {
    containerLikedSongs.innerHTML = `
    <p class="text-light"> Non hai messo Mi Piace a nessuna canzone <i class="bi bi-emoji-frown"></i> </p>`;
  }
};
loadLikedSongs();
const closeFriends_btn = document.querySelector(".show-friends");

const showFriends = function () {
  const aside = document.querySelector("aside");
  aside.classList.toggle("d-none");
};

closeFriends_btn.onclick = showFriends;
