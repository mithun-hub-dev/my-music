// ==========================
// Mithun's Music Player
// ==========================

// Playlist

const playlist = [

{
title:"Enthara Enthara",
artist:"Tamil OST",
movie:"Thirumanam Enum Nikkah",
file:"songs/Enthara-Enthara.mp3",
cover:"images/Thirumanam_ennum_nikkah.jpg"
},

{
title:"Gulmohar Malare",
artist:"Tamil OST",
movie:"Majunu",
file:"songs/Gulmohar-Malare.mp3",
cover:"images/Majunu.jpg"
},

{
title:"Hey Minnale",
artist:"Tamil OST",
movie:"Amaran",
file:"songs/Hey Minnale.mp3",
cover:"images/Amaran_2024.jpg"
},

{
title:"Kanave",
artist:"Tamil OST",
movie:"Amaran",
file:"songs/Kanave.mp3",
cover:"images/Amaran_2024.jpg"
},

{
title:"Neeyae",
artist:"Tamil OST",
movie:"Pugazh",
file:"songs/Neeyae.mp3",
cover:"images/Pugazh.jpg"
},

{
title:"Uyirey",
artist:"Tamil OST",
movie:"Amaran",
file:"songs/Uyirey.mp3",
cover:"images/Amaran_2024.jpg"
},

{
title:"Vaane Vaane",
artist:"Tamil OST",
movie:"Amaran",
file:"songs/Vaane Vaane.mp3",
cover:"images/Amaran_2024.jpg"
},

{
title:"Vennilavu Saaral",
artist:"Tamil OST",
movie:"Amaran",
file:"songs/Vennilavu Saaral.mp3",
cover:"images/Amaran_2024.jpg"
}

];


// ==========================
// Elements
// ==========================

const audio=document.getElementById("audio");

const playlistContainer=document.getElementById("playlist");

const cover=document.getElementById("cover");

const title=document.getElementById("title");

const artist=document.getElementById("artist");

const movie=document.getElementById("movie");

const playBtn=document.getElementById("play");

const nextBtn=document.getElementById("next");

const prevBtn=document.getElementById("previous");

const progress=document.getElementById("progress");

const volume=document.getElementById("volume");

const search=document.getElementById("search");

const currentTimeText=document.getElementById("currentTime");

const durationText=document.getElementById("duration");



let currentSong=0;


// ==========================
// Build Playlist
// ==========================

function buildPlaylist(list){

playlistContainer.innerHTML="";

list.forEach((song,index)=>{

const div=document.createElement("div");

div.className="song";

div.innerHTML=`

<img src="${song.cover}">

<div class="song-info">

<h3>${song.title}</h3>

<p>${song.artist}</p>

<p>${song.movie}</p>

</div>

`;

div.onclick=()=>{

let songIndex = playlist.findIndex(item => item.title === song.title);

loadSong(songIndex);

playSong();

};

playlistContainer.appendChild(div);

});

}

buildPlaylist(playlist);


// ==========================
// Load Song
// ==========================

function loadSong(index){

currentSong=index;

audio.src=playlist[index].file;

audio.load();

progress.value=0;

currentTimeText.innerHTML="0:00";

durationText.innerHTML="0:00";

cover.src=playlist[index].cover;

title.innerHTML=playlist[index].title;

artist.innerHTML=playlist[index].artist;

movie.innerHTML=playlist[index].movie;

highlightSong();

}

loadSong(0);


// ==========================
// Highlight Song
// ==========================

function highlightSong(){

const songs=document.querySelectorAll(".song");

songs.forEach(song=>song.classList.remove("active"));

songs[currentSong].classList.add("active");

}


// ==========================
// Play Song
// ==========================

function playSong(){

audio.play();

playBtn.innerHTML="⏸";

}


// ==========================
// Pause Song
// ==========================

function pauseSong(){

audio.pause();

playBtn.innerHTML="▶️";

}


// ==========================
// Play Button
// ==========================

playBtn.onclick=()=>{

if(audio.paused){

playSong();

}

else{

pauseSong();

}

};


// ==========================
// Next
// ==========================

nextBtn.onclick=()=>{

currentSong++;

if(currentSong>=playlist.length){

currentSong=0;

}

loadSong(currentSong);

playSong();

};


// ==========================
// Previous
// ==========================

prevBtn.onclick=()=>{

currentSong--;

if(currentSong<0){

currentSong=playlist.length-1;

}

loadSong(currentSong);

playSong();

};


// ==========================
// Volume
// ==========================

volume.oninput=()=>{

audio.volume=volume.value;

};

// ==========================
// Progress Bar & Time Update
// ==========================

audio.addEventListener("timeupdate", ()=>{

if(audio.duration){

let progressPercent = (audio.currentTime / audio.duration) * 100;

progress.value = progressPercent;


// Current time display

let currentMinutes = Math.floor(audio.currentTime / 60);

let currentSeconds = Math.floor(audio.currentTime % 60);

if(currentSeconds < 10){

currentSeconds = "0" + currentSeconds;

}

currentTimeText.innerHTML = `${currentMinutes}:${currentSeconds}`;


// Duration display

let durationMinutes = Math.floor(audio.duration / 60);

let durationSeconds = Math.floor(audio.duration % 60);

if(durationSeconds < 10){

durationSeconds = "0" + durationSeconds;

}

durationText.innerHTML = `${durationMinutes}:${durationSeconds}`;

}

});



// ==========================
// Seek Song Using Progress Bar
// ==========================

progress.oninput=()=>{

if(audio.duration){

audio.currentTime = (progress.value / 100) * audio.duration;

}

};



// ==========================
// Reset Progress When New Song Loads
// ==========================

audio.addEventListener("loadedmetadata", ()=>{

progress.value=0;

});



// ==========================
// Auto Play Next Song
// ==========================

audio.addEventListener("ended", ()=>{

nextBtn.click();

});

// Rebuild playlist with search results

playlistContainer.innerHTML="";


filteredSongs.forEach((song)=>{

const div=document.createElement("div");

div.className="song";

div.innerHTML=`

<img src="${song.cover}">

<div class="song-info">

<h3>${song.title}</h3>

<p>${song.artist}</p>

<p>${song.movie}</p>

</div>

`;

div.onclick=()=>{

let songIndex = playlist.indexOf(song);

loadSong(songIndex);

playSong();

};


playlistContainer.appendChild(div);


});


};
// ==========================
// Search Function
// ==========================

search.addEventListener("input", function(){

let text = search.value.toLowerCase();

let filtered = playlist.filter(song => {

return (
song.title.toLowerCase().includes(text) ||
song.movie.toLowerCase().includes(text) ||
song.artist.toLowerCase().includes(text)
);

});


buildPlaylist(filtered);


});
