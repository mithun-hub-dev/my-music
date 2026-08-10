// ==========================
// Mithun's Music Player
// ==========================


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

const playlistMenu=document.getElementById("playlistMenu");

const ilaiyarajaMenu=document.getElementById("ilaiyarajaMenu");

const recentMenu=document.getElementById("recentMenu");

const sectionTitle=document.getElementById("sectionTitle");

let currentSong=0;

let shuffleMode=false;

let repeatMode=false;

let currentRadio = null;

let currentPlaylist = playlist;

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let recentlyPlayed =
JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

let lastPlayedTitle = "";

// ==========================
// Build Playlist
// ==========================

function buildPlaylist(list){

playlistContainer.innerHTML="";

list.forEach((song)=>{

const div=document.createElement("div");

div.className="song";
div.dataset.title = song.title;

let isFavorite = favorites.includes(song.title);


div.innerHTML=

<img src="${song.cover}">

<div class="song-info">

<h3>${song.title}</h3>

<p>${song.artist}</p>

<p>${song.movie}</p>

</div>

<button class="favorite">
${isFavorite ? "❤️" : "🤍"}
</button>

;

div.onclick=()=>{

let songIndex=currentPlaylist.findIndex(item=>item.title===song.title);

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

// ==========================
// Highlight Current Song
// ==========================

function highlightCurrentSong(){

    document.querySelectorAll(".song").forEach(songDiv=>{

        if(songDiv.dataset.title === currentPlaylist[currentSong].title){

            songDiv.classList.add("active");

        }else{

            songDiv.classList.remove("active");

        }

    });

}

// Initial playlist

buildPlaylist(playlist);

// ==========================
// Recently Played
// ==========================

function addToRecentlyPlayed(song){

    recentlyPlayed = recentlyPlayed.filter(item =>
        item.title !== song.title
    );

    recentlyPlayed.unshift(song);

    if(recentlyPlayed.length > 20){
        recentlyPlayed.pop();
    }

    localStorage.setItem(
        "recentlyPlayed",
        JSON.stringify(recentlyPlayed)
    );

}

// ==========================
// Load Song
// ==========================

function loadSong(index){

    if(currentRadio !== null){

        stopRadio();

    }

    currentSong=index;

    audio.pause();

    audio.src=currentPlaylist[index].file;

    progress.value=0;

    currentTimeText.innerHTML="0:00";

    durationText.innerHTML="0:00";

    cover.src=currentPlaylist[index].cover;

    title.innerHTML=currentPlaylist[index].title;

    artist.innerHTML=currentPlaylist[index].artist;

    movie.innerHTML=currentPlaylist[index].movie;

    audio.load();

    highlightCurrentSong();

}

// Load first song

loadSong(0);


// ==========================
// Play / Pause
// ==========================

function playSong(){

    // Normal song playback

    audio.play()
    .then(()=>{

        playBtn.innerHTML="⏸";

        if(
            lastPlayedTitle !==
            currentPlaylist[currentSong].title
        ){

            addToRecentlyPlayed(
                currentPlaylist[currentSong]
            );

            lastPlayedTitle =
                currentPlaylist[currentSong].title;

        }

    })
    .catch(error=>{

        console.log(
            "Playback interrupted:",
            error
        );

    });

}


function pauseSong(){

    audio.pause();

    playBtn.innerHTML="▶️";

}


// ==========================
// Main Play Button
// ==========================

playBtn.onclick=()=>{

    // RADIO MODE

    if(currentRadio !== null){

        if(audio.paused){

            audio.play()
            .then(()=>{

                playBtn.innerHTML="⏸";

            })
            .catch(error=>{

                console.error(
                    "Radio resume failed:",
                    error
                );

            });

        }

        else{

            audio.pause();

            playBtn.innerHTML="▶️";

        }

        return;

    }


    // NORMAL SONG MODE

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

currentSong=currentPlaylist.length-1;

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


currentTimeText.innerHTML =
`${currentMinutes}:${currentSeconds}`;



let durationMinutes=Math.floor(audio.duration/60);

let durationSeconds=Math.floor(audio.duration%60);


if(durationSeconds<10){

durationSeconds="0"+durationSeconds;

}


durationText.innerHTML =
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


let filteredSongs = currentPlaylist.filter(song=>{

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

randomSong=Math.floor(Math.random()*currentPlaylist.length);

}
while(randomSong===currentSong);



currentSong=randomSong;


}

else{


currentSong++;


if(currentSong>=currentPlaylist.length){

currentSong=0;

}


}


loadSong(currentSong);

playSong();


}

// ==========================
// Sidebar Menu
// ==========================


favoritesMenu.addEventListener("click",()=>{

search.value="";

let favoriteSongs = playlist.filter(song =>

favorites.includes(song.title)

);

currentPlaylist=favoriteSongs;

currentSong=0;

buildPlaylist(currentPlaylist);

loadSong(0);

});

// ==========================
// Recent Activity
// ==========================

recentMenu.addEventListener("click",()=>{

search.value="";

currentPlaylist=recentlyPlayed;

currentSong=0;

buildPlaylist(currentPlaylist);

loadSong(0);

});

// ==========================
// Playlist Menu
// ==========================

playlistMenu.addEventListener("click",()=>{

search.value="";

currentPlaylist = playlist;

currentSong=0;

buildPlaylist(currentPlaylist);

loadSong(0);

});

ilaiyarajaMenu.addEventListener("click",()=>{

    search.value="";

    currentPlaylist = playlist.filter(song =>
        song.category === "Ilaiyaraaja"
    );

    currentSong=0;

    buildPlaylist(currentPlaylist);

    loadSong(0);

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

// ==========================
// IST Date & Time Clock
// ==========================

function updateDateTime(){

const now = new Date();


const dateOptions = {
    timeZone:"Asia/Kolkata",
    day:"2-digit",
    month:"short",
    year:"numeric"
};


const timeOptions = {
    timeZone:"Asia/Kolkata",
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit",
    hour12:false
};


let date = now.toLocaleDateString("en-IN", dateOptions);

let time = now.toLocaleTimeString("en-IN", timeOptions);


// Convert month to uppercase

date = date.replace(
    /[a-zA-Z]+/,
    month => month.toUpperCase()
);


document.getElementById("dateTime").innerHTML =
    `${date} | ${time}`;

}


updateDateTime();

setInterval(updateDateTime,1000);


// ==========================
// Radio Stations
// ==========================

const radioButtons = document.querySelectorAll(".radio-btn");

const radioStations = {

    radiocity: {
        name: "Radio City",
        frequency: "91.1 FM",
        stream: "http://104.238.193.114:7077/;stream.mp3"
    },

    suryan: {
        name: "Suryan FM",
        frequency: "93.5 FM",
        stream: "http://31.14.40.149:8000/;stream.mp3"
    },

    kovaifm: {
        name: "Kovai FM",
        frequency: "95.5 FM",
        stream: ""
    },

    mirchi: {
        name: "Radio Mirchi",
        frequency: "98.3 FM",
        stream: "http://163.172.158.94:8052/;stream.mp3"
    },

    airrainbow: {
        name: "AIR FM Rainbow",
        frequency: "103.0 MHz",
        stream: "http://163.172.158.94:8066/;stream.mp3"
    },

    hellofm: {
        name: "Hello FM",
        frequency: "106.4 FM",
        stream: "http://163.172.158.94:8048/;stream.mp3"
    }

};


// ==========================
// Play Radio
// ==========================

function playRadio(stationId){

    const station = radioStations[stationId];

    if(!station){

        console.error("Radio station not found:", stationId);

        return;

    }


    // No stream available

    if(!station.stream){

        alert(
            station.name +
            " stream is not available right now."
        );

        return;

    }


    // Stop current audio

    audio.pause();


    // Load radio stream

    audio.src = station.stream;

    audio.load();


    audio.play()
    .then(()=>{

        currentRadio = stationId;

        // Change player button

        playBtn.innerHTML = "⏸";


        // Update player information

        title.innerHTML = station.name;

        artist.innerHTML = "Live Radio";

        movie.innerHTML = station.frequency;


        // Reset progress because radio is live

        progress.value = 0;

        currentTimeText.innerHTML = "LIVE";

        durationText.innerHTML = "LIVE";


        // Remove active state from all buttons

        radioButtons.forEach(button=>{

            button.classList.remove("active");

        });


        // Highlight selected radio

        const activeButton =
    document.querySelector(
        `.radio-btn[data-radio="${stationId}"]`
    );


        if(activeButton){

            activeButton.classList.add("active");

            activeButton.innerHTML =
    `⏸️ ${station.name}
     <span>${station.frequency}</span>`;

        }

    })

    .catch(error=>{

        console.error(
            "Radio playback failed:",
            error
        );

        alert(
            "Unable to play " +
            station.name +
            ". The stream may be offline."
        );

    });

}


// ==========================
// Radio Button Click
// ==========================

radioButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const stationId =
            button.dataset.radio;


        // Same radio → Pause

        if(
            currentRadio === stationId &&
            !audio.paused
        ){

            audio.pause();

            playBtn.innerHTML = "▶️";

            return;

        }


        // Restore all radio buttons

        radioButtons.forEach(btn=>{

            const id =
                btn.dataset.radio;

            const station =
                radioStations[id];


            btn.classList.remove("active");


            btn.innerHTML =
    `▶️ ${station.name}
     <span>${station.frequency}</span>`;

        });


        // Play selected radio

        playRadio(stationId);

    });

});
