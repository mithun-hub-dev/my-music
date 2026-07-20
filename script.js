// ==========================
// Mithun's Music Player
// ==========================


// Playlist


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

const shuffleBtn=document.getElementById("shuffle");

const repeatBtn=document.getElementById("repeat");

const currentTimeText=document.getElementById("currentTime");

const durationText=document.getElementById("duration");

const favoritesMenu=document.getElementById("favoritesMenu");

const homeMenu=document.getElementById("homeMenu");

const playlistMenu=document.getElementById("playlistMenu");

const sectionTitle=document.getElementById("sectionTitle");

let currentSong=0;

let shuffleMode=false;

let repeatMode=false;

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// ==========================
// Build Playlist
// ==========================

function buildPlaylist(list){

playlistContainer.innerHTML="";

list.forEach((song)=>{

const div=document.createElement("div");

div.className="song";


let isFavorite = favorites.includes(song.title);


div.innerHTML=`

<img src="${song.cover}">

<div class="song-info">

<h3>${song.title}</h3>

<p>${song.artist}</p>

<p>${song.movie}</p>

</div>

<button class="favorite">
${isFavorite ? "❤️" : "🤍"}
</button>

`;

div.onclick=()=>{

let songIndex=playlist.findIndex(item=>item.title===song.title);

loadSong(songIndex);

playSong();

};


playlistContainer.appendChild(div);

let favBtn = div.querySelector(".favorite");


favBtn.onclick=(event)=>{

event.stopPropagation();


if(favorites.includes(song.title)){

favorites = favorites.filter(item => item !== song.title);

}

else{

favorites.push(song.title);

}


localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);


buildPlaylist(list);


};


});


}



// Initial playlist

buildPlaylist(playlist);



// ==========================
// Load Song
// ==========================

function loadSong(index){

currentSong=index;


audio.pause();

audio.src=playlist[index].file;


progress.value=0;

currentTimeText.innerHTML="0:00";

durationText.innerHTML="0:00";


cover.src=playlist[index].cover;

title.innerHTML=playlist[index].title;

artist.innerHTML=playlist[index].artist;

movie.innerHTML=playlist[index].movie;


audio.load();

}

// Load first song

loadSong(0);


// ==========================
// Play / Pause
// ==========================

function playSong(){

audio.play()
.then(()=>{

playBtn.innerHTML="⏸";

})
.catch(error=>{

console.log("Playback interrupted");

});

}

function pauseSong(){

audio.pause();

playBtn.innerHTML="▶️";

}



playBtn.onclick=()=>{


if(audio.paused){

playSong();

}

else{

pauseSong();

}


};

// ==========================
// Next Song
// ==========================

nextBtn.onclick=()=>{

playNextSong();

};

// ==========================
// Previous Song
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
// Progress Bar
// ==========================

audio.addEventListener("timeupdate",()=>{


if(audio.duration){


progress.value=(audio.currentTime/audio.duration)*100;



let currentMinutes=Math.floor(audio.currentTime/60);

let currentSeconds=Math.floor(audio.currentTime%60);


if(currentSeconds<10){

currentSeconds="0"+currentSeconds;

}


currentTimeText.innerHTML=
`${currentMinutes}:${currentSeconds}`;



let durationMinutes=Math.floor(audio.duration/60);

let durationSeconds=Math.floor(audio.duration%60);


if(durationSeconds<10){

durationSeconds="0"+durationSeconds;

}


durationText.innerHTML=
`${durationMinutes}:${durationSeconds}`;


}


});




// ==========================
// Seek
// ==========================

progress.oninput=()=>{


if(audio.duration){

audio.currentTime=
(progress.value/100)*audio.duration;

}


};




// ==========================
// Reset Progress
// ==========================

audio.addEventListener("loadedmetadata",()=>{

progress.value=0;

});




// ==========================
// Auto Next Song
// ==========================

audio.addEventListener("ended",()=>{

playNextSong();

});




// ==========================
// Search Songs
// ==========================

search.addEventListener("input",()=>{

let text = search.value.toLowerCase();


let filteredSongs = playlist.filter(song=>{

return (

song.title.toLowerCase().includes(text) ||

song.movie.toLowerCase().includes(text) ||

song.artist.toLowerCase().includes(text)

);

});


buildPlaylist(filteredSongs);


});

// ==========================
// Shuffle Button
// ==========================

shuffleBtn.onclick=()=>{

shuffleMode=!shuffleMode;


if(shuffleMode){

shuffleBtn.style.opacity="0.5";

}

else{

shuffleBtn.style.opacity="1";

}


};



// ==========================
// Repeat Button
// ==========================

repeatBtn.onclick=()=>{


repeatMode=!repeatMode;


if(repeatMode){

repeatBtn.style.opacity="0.5";

}

else{

repeatBtn.style.opacity="1";

}


};



// ==========================
// Updated Next Song Logic
// ==========================

function playNextSong(){


if(repeatMode){

loadSong(currentSong);

playSong();

return;

}



if(shuffleMode){

let randomSong;


do{

randomSong=Math.floor(Math.random()*playlist.length);

}
while(randomSong===currentSong);



currentSong=randomSong;


}

else{


currentSong++;


if(currentSong>=playlist.length){

currentSong=0;

}


}


loadSong(currentSong);

playSong();


}

// ==========================
// Sidebar Menu
// ==========================

homeMenu.addEventListener("click",()=>{

search.value="";

buildPlaylist(playlist);

});


favoritesMenu.addEventListener("click",()=>{

search.value="";

let favoriteSongs = playlist.filter(song =>

favorites.includes(song.title)

);

buildPlaylist(favoriteSongs);

});


// ==========================
// Playlist Menu
// ==========================

playlistMenu.addEventListener("click",()=>{

search.value="";

buildPlaylist(playlist);

});

// ==========================
// Active Menu Highlight
// ==========================

const menus=document.querySelectorAll(".menu");


menus.forEach(menu=>{

menu.addEventListener("click",()=>{

menus.forEach(item=>{

item.classList.remove("active");

});


menu.classList.add("active");

});

});
