let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
//+
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// צור את אלמט השמע
let myAudio = document.createElement("audio");

//הגדר את רצועות השמע שיש להשמיע
let track_list = [
  {
    name: "חכמת חינוך-פרשת בראשית",
    artist: "הרב חנינא מנס",
    path: "https://kol-tvuna.co.il/wp-content/uploads/2020/07/%D7%97%D7%9B%D7%9E%D7%AA-%D7%97%D7%99%D7%A0%D7%95%D7%9A-%D7%91%D7%9C%D7%A7.mp3",
  },
  {
    name: "חכמת חינוך-פרשת שמות",
    artist: "הרב חנינא מנס",
    path: "https://kol-tvuna.co.il/wp-content/uploads/2020/07/%D7%97%D7%9B%D7%9E%D7%AA-%D7%97%D7%99%D7%A0%D7%95%D7%9A-%D7%91%D7%9C%D7%A7.mp3",
  },
  {
    name: "חכמת חינוך-פרשת ויקרא",
    artist: "הרב חנינא מנס",
    path: "https://kol-tvuna.co.il/wp-content/uploads/2020/07/%D7%97%D7%9B%D7%9E%D7%AA-%D7%97%D7%99%D7%A0%D7%95%D7%9A-%D7%91%D7%9C%D7%A7.mp3",
  },
];
function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();

  // Load a new track
  myAudio.src = track_list[track_index].path;
  myAudio.load();

  // Update details of the track
  track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  // Move to the next track if the current finishes playing
  // using the 'ended' event
  myAudio.addEventListener("ended", nextTrack);
}

// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  // Play the loaded track
  myAudio.play();
  isPlaying = true;

  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  // Pause the loaded track
  myAudio.pause();
  isPlaying = false;

  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  seekto = myAudio.duration * (seek_slider.value / 100);

  // Set the current track position to the calculated seek position
  myAudio.currentTime = seekto;
}

function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  myAudio.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(myAudio.duration)) {
    seekPosition = myAudio.currentTime * (100 / myAudio.duration);
    seek_slider.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(myAudio.currentTime / 60);
    let currentSeconds = Math.floor(myAudio.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(myAudio.duration / 60);
    let durationSeconds = Math.floor(myAudio.duration - durationMinutes * 60);

    // Add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
updateTimer = setInterval(seekUpdate, 1000);
// Load the first track in the tracklist
loadTrack(track_index);
