

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");


 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");

let total_duration = document.querySelector(".total-duration");
let track_index = 0;
let isPlaying = false;
let updateTimer;

const d = new Date();
const days=["일","월","화","수","목","금","토",];
let day=days[d.getDay()];
 document.getElementById("cur-date").innerHTML= d.toLocaleString() + "/  "+ day; 
 
   
// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "팝송",
    artist: "Bridge of Troubled Water",
    autho:"Paul Simom",
    image: "./img/freedom.jpg",
    path: "./mus/Bridge Over.mp3"
  },
  {
    name: "7080 가요",
    artist: "사랑이야",
    autho:"해바라기",
    image: "./img/kpop.jpg",
    path: "./mus/사랑으로.mp3"
  },
  {
    name: "Guitar Hymns",
    artist: "135장 통기타 찬송가",
    autho:"기타:임재수",
    image: "./img/tonggt.jpg",
    path: "./mus/135GT.mp3"
  },
  {
    name: "펜타토닉 Pentatonic A단조 연습",
    artist: "Groove Funk",
    autho:"jamtrace",
    image: "./img/jamtrace.png",
    path: "./mus/jamtrace/groove funk.mp3"
  },
];
  //document.getElementById("cur-date").innerText =d;
// document.getElementById("cur-date").innerHTML= d.toLocaleString() + "/  "+ day;

//------- Create an array of audio file URLs
const playlist = [  'song1.mp3',  'song2.mp3',  'song3.mp3',];

// Create an HTML5 audio element
const audio = new Audio();

// Set the first song as the current track
let currentTrack = 0;
audio.src = playlist[currentTrack];

// Play the current track when the audio element is clicked
audio.addEventListener('click', () => {
  audio.play();
});

// When the current track ends, play the next track in the playlist
audio.addEventListener('ended', () => {
  currentTrack++;
  if (currentTrack >= playlist.length) {
    currentTrack = 0;
  }
  audio.src = playlist[currentTrack];
  audio.play();
});

// Add the audio element to the page
document.body.appendChild(audio);
//-------------//


function random_bg_color() {

  //.. Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  //.. Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  //.. Set the background to that color
  document.body.style.background = bgColor;
}  

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues(); 
  curr_track.src = track_list[track_index].path; //unplay
  curr_track.load();
  
  now_playing.textContent = "PLAYING " + track_list[track_index].name;
  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].artist;
  track_artist.textContent = track_list[track_index].autho;
  //now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  
  updateTimer = setInterval(seekUpdate, 1000);         //진행바 숫자표시
  curr_track.addEventListener("ended", nextTrack);     //다음곡으로
  //random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
  const d = new Date();
  document.getElementById("cur-date").innerHTML= d.toLocaleString() + "/  "+ day;
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
 }

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
 }

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
  
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}      