const musicSrc = "sounds/music.mp3";

// Variables
let playBtn;
let preBtn;
let nextBtn;
let range;
let playIcon;

let isPlaying = false;
let duration = 0;
let currentTime = 0;
let song;



// MAIN structure
const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    playBtn = document.getElementById('play');
    preBtn = document.getElementById('pre');
    nextBtn = document.getElementById('next');
    range = document.getElementById('range');
    playIcon = document.getElementById('play-icon');
    song = new Audio();
}

const prepareDOMEvents = () => {
    window.onload = playSong;
}

const playSong = () => {
    song.src = musicSrc;

    playBtn.addEventListener('click', () => {
        if (!isPlaying) {
            song.play();
            isPlaying = true;
            duration = song.duration;
            range.max = duration;
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            song.pause();
            isPlaying = false;
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }

        range.addEventListener('change', () => {
            song.currentTime = range.value;
        });

        song.addEventListener('timeupdate', () => {
            range.value = song.currentTime;
        });

        song.addEventListener('ended', () => {
            song.currentTime = 0;
            song.pause();
            isPlaying = false;
            range.value = 0;
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        });
    });
}

// MAIN event
document.addEventListener('DOMContentLoaded', main);