const ulrArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist";

let params = new URLSearchParams(location.search);
console.log(params);

let ourIDArtist = params.get("id");
console.log(ourIDArtist);

const doveMettoArtista = document.getElementById("artistaCaricato");
const fetchUrlArtist = async function () {
  try {
    let res = await fetch(`${ulrArtist}/${ourIDArtist}`);
    if (res.ok) {
      const data = await res.json();
      console.log(data);

      doveMettoArtista.innerHTML += `
       <div class="row pt-4">
              <div class="col-3 ">
                <img
                  class="img-fluid"
                  src=${data.picture_big}
                  alt="album Cover"
                />
              </div>
              <div class="col-9">
                
                <h5>${data.name}</h5>
                <p>${data.nb_fan}</p>
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

      //   const tracks = data.tracks.data;

      //   tracks.forEach((el, index) => {
      //     doveMettoArtista.innerHTML += `
      //     <div class="row">
      //           <div class="col d-flex">
      //             <div class="col-1">
      //               <p>${index + 1}</p>
      //             </div>
      //             <div class="col-6">
      //               <p>${el.title}</p>
      //               <p>${el.artist.name}</p>
      //             </div>
      //           </div>
      //           <div class="col-3">
      //             <p>${el.rank}</p>
      //           </div>
      //           <div class="col-2">
      //             <p>${Math.floor(el.duration / 60)}</p>
      //           </div>
      //         </div>`;
      //   });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
fetchUrlArtist();
