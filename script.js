// ==========================
// Mithun's Music Player
// ==========================

// Playlist

const playlist = [

{
title:"Enthara Enthara",
artist:"Tamil OST",
movie:"Thirumanam Enum Nikkah",
file:"Enthara-Enthara.mp3",
cover:"Thirumanam_ennum_nikkah.jpg"
},

{
title:"Gulmohar Malare",
artist:"Tamil OST",
movie:"Majunu",
file:"Gulmohar-Malare.mp3",
cover:"Majunu.jpg"
},

{
title:"Hey Minnale",
artist:"Tamil OST",
movie:"Amaran",
file:"Hey Minnale.mp3",
cover:"Amaran_2024.jpg"
},

{
title:"Kanave",
artist:"Tamil OST",
movie:"Amaran",
file:"Kanave.mp3",
cover:"Amaran_2024.jpg"
},

{
title:"Neeyae",
artist:"Tamil OST",
movie:"Pugazh",
file:"Neeyae.mp3",
cover:"Pugazh.jpg"
},

{
title:"Uyirey",
artist:"Tamil OST",
movie:"Amaran",
file:"Uyirey.mp3",
cover:"Amaran_2024.jpg"
},

{
title:"Vaane Vaane",
artist:"Tamil OST",
movie:"Amaran",
file:"Vaane Vaane.mp3",
cover:"Amaran_2024.jpg"
},

{
title:"Vennilavu Saaral",
artist:"Tamil OST",
movie:"Amaran",
file:"Vennilavu Saaral.mp3",
cover:"Amaran_2024.jpg"
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

loadSong(index);

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
