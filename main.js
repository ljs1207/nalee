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
   
// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "7080 가요",
    artist: "서른즈음에",
    autho:"김광석",
    image: "./img/freedom.jpg",
    path: "./mus/kpo1.mp3"
  },
  {
    name: "7080 가요",
    artist: "사랑이야",
    autho:"해바라기",
    image: "./img/kpop.jpg",
    path: "./mus/kpo2.mp3"
  },
  {
    name: "Guitar Hymns",
    artist: "135장 통기타 찬송가",
    autho:"기타:임재수",
    image: "./img/tonggt.jpg",
    path: "./mus/cgt_h135.mp3"
  },
  {
    name: "펜타토닉(Pentatonic)\n\ A단조 연습",
    artist: "Groove Funk",
    autho:"jamtrace",
    image: "./img/jamtrace.png",
    path: "./mus/jamtrace/groove funk.mp3"
  },
]; 

//.. Create an HTML5 audio element
let currentTrack = 0;
const audioelemet = new Audio();

//.. Set the first song as the current track

audioelemet.src = track_list[currentTrack];

//.. Play the current track when the audio element is clicked
audioelemet.addEventListener('click', () => {audioelemet.play();});

//.. When the current track ends, play the next track in the track_list
audioelemet.addEventListener('ended', () => {
  currentTrack++;
  if (currentTrack >= track_list.length) {
    currentTrack = 0;
  }
  audioelemet.src = track_list[currentTrack];
  audioelemet.play();
});
audioelemet.play();  //play 주축========================
// Add the audio element to the page 
document.body.appendChild(audioelemet);
//-------------*/

let currentSong = 0;

let audioElement = new Audio(track_list[currentSong]);

audioElement.addEventListener('ended', function() {
  currentSong++;
  if (currentSong >= track_list.length) {
    currentSong = 0;
  }
  audioElement.src = track_list[currentSong];
  //audioElement.play();
});
document.getElementById("demo").innerHTML =d;
//audioElement.play();  */


// 실 시간 보기
// const d = new Date();
//   const days=["일","월","화","수","목","금","토",];
//   let day = days[d.getDay()];
//   document.getElementById("to-day").innerHTML= d.toLocaleString() + "/  "+ day; 
  
function startTime(){
  const d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  //document.getElementById('cur-clock').innerHTML =  h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);

  //const d = new Date();
  const days=["일","월","화","수","목","금","토",];
  let day = days[d.getDay()];
  document.getElementById("cur-clock").innerHTML= d.toLocaleString() + "/  "+ day; 
    
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
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
  // const d = new Date();
  // document.getElementById("cur-clock").innerHTML= d.toLocaleString() + "/  "+ day;
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