// SONGS
let songs = [
  {title: "About You", artist: "The 1975", cover: "images/cover1.jpg", file: "music/aboutyou.mp3"},
  {title: "Back to Friends", artist: "Sombr", cover: "images/cover2.jpg", file: "music/backtofriend.mp3"},
  {title: "Iris", artist: "Goo Goo Dolls", cover: "images/cover3.jfif", file: "music/iris.mp3"}
];

let currentSong = 0;
const player = document.getElementById("audio-player");
const cover = document.getElementById("cover");
const title = document.getElementById("song-title");
const artist = document.getElementById("artist-name");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progress-bar");
const playlistItems = document.querySelectorAll("#playlist li");

// LOAD SONG
function loadSong(index) {
  currentSong = index;
  player.src = songs[index].file;
  cover.src = songs[index].cover;
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
  player.play();
  playBtn.textContent = "⏸";
  highlightCurrent();
}

// HIGHLIGHT PLAYLIST
function highlightCurrent() {
  playlistItems.forEach((item, index) => {
    item.classList.toggle("active", index === currentSong);
  });
}

// PLAYLIST CLICK
playlistItems.forEach((item, index) => {
  item.addEventListener("click", () => loadSong(index));
});

// PLAY / PAUSE
function playPause() {
  if(player.paused) {
    player.play();
    playBtn.textContent = "⏸";
  } else {
    player.pause();
    playBtn.textContent = "▶";
  }
}

// NEXT / PREV SONG
function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
}
function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
}

// PROGRESS BAR
player.addEventListener("timeupdate", () => {
  const percent = (player.currentTime / player.duration) * 100;
  progressBar.style.width = percent + "%";
});

document.querySelector(".progress-container").addEventListener("click", e => {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  player.currentTime = (clickX / width) * player.duration;
});

// BUTTON LISTENERS
playBtn.addEventListener("click", playPause);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
player.addEventListener("ended", nextSong);

// KEYBOARD CONTROLS
document.addEventListener("keydown", e => {
  if(e.code === "Space") {
    e.preventDefault();
    playPause();
  } else if(e.code === "ArrowRight") {
    nextSong();
  } else if(e.code === "ArrowLeft") {
    prevSong();
  }
});

// LOAD FIRST SONG
loadSong(0);

// DYNAMIC ARTIST GRID
const artistGrid = document.getElementById("artist-grid");
const artistImages = [
  "images/artist1.jpg",
  "images/artist2.jfif",
  "images/artist3.jfif"
];

artistImages.forEach((src, index) => {
  let img = document.createElement("img");
  img.src = src;
  img.alt = "Artist " + (index + 1);

  // If image fails to load, use placeholder
  img.onerror = () => {
    img.src = "https://via.placeholder.com/150?text=Artist+" + (index + 1);
  };

  artistGrid.appendChild(img);
});