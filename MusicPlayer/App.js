const data = {
    songs: [
        {
            title: "[Hunter X Hunter OP1] Ohayou by Keno",
            src: "sounds/music.mp3"
        },
    ]
}

class App {
    constructor() {
        const song = new Song(data.songs[0].title, data.songs[0].src);

        this.songTitle = document.querySelector('.title h1');
        this.range = document.getElementById('range');
        this.prevBtn = document.getElementById('prev');
        this.playBtn = document.getElementById('play');
        this.nextBtn = document.getElementById('next');
        this.playIcon = document.getElementById('play-icon');

        this.audio = new Audio();
        this.player = new Player(song);

        this.audio.src = this.player.song.src;

        this.playBtn.addEventListener('click', () => {
            if (!this.player.isPlaying) {
                this.audio.play();
                this.player.isPlaying = true;
                this.player.song.duration = this.audio.duration;
                this.range.max = this.player.song.duration;
                this.playIcon.classList.remove('fa-play');
                this.playIcon.classList.add('fa-pause');
            } else {
                this.audio.pause();
                this.player.isPlaying = false;
                this.playIcon.classList.remove('fa-pause');
                this.playIcon.classList.add('fa-play');
            }

            this.range.addEventListener('change', () => {
                this.player.song.currentTime = this.range.value;
                this.audio.currentTime = this.player.song.currentTime;
            });

            this.audio.addEventListener('timeupdate', () => {
                this.player.song.currentTime = this.audio.currentTime;
                this.range.value = this.player.song.currentTime;
            });

            this.audio.addEventListener('ended', () => {
                this.player.song.currentTime = 0;
                this.audio.currentTime = this.player.song.currentTime;
                this.audio.pause();
                this.player.isPlaying = false;
                this.range.value = 0;
                this.playIcon.classList.remove('fa-pause');
                this.playIcon.classList.add('fa-play');
            });
        });

        this.render();
    }

    render() {
        this.songTitle.innerText = this.player.song.title;
    }
}