let audio_intro = new Audio('audio/intro.mp3');
audio_intro.volume = 0.1;
let audio_background = new Audio('audio/background.mp3');
audio_background.volume = 0.1;
let audio_win = new Audio('audio/win.mp3');
audio_win.volume = 0.1;
let audio_coin = new Audio('audio/coin.mp3');
audio_coin.volume = 0.05;
let audio_bottle = new Audio('audio/bottle.mp3');
audio_bottle.volume = 0.1;
let audio_splash = new Audio('audio/bottle_splash.mp3');
let audio_death = new Audio('audio/death.mp3');
let audio_walking = new Audio('audio/walking_short.mp3');
let audio_hurt_1 = new Audio('audio/hurt_1.mp3');
let audio_hurt_2 = new Audio('audio/hurt_2.mp3');
let audio_hurt_3 = new Audio('audio/hurt_3.mp3');
let audio_boss = new Audio ('audio/angry_boss.mp3');
let audio_chicken = new Audio ('audio/dead_chicken.mp3');

// For playing random hurt sound each time player gets hurt.
let hurtedFeelings = [
    audio_hurt_1,
    audio_hurt_2,
    audio_hurt_3
];

let introMusicPlaying = false;
let backgroundMusicPlaying = false;
let backgroundMusicInterval;
let hurtSoundPlayed = false;


function toggleMusic(event) {
    event.stopPropagation();
    if (introMusicPlaying || backgroundMusicPlaying) {
        pauseAllMusic();
    }
    else if (!introMusicPlaying && !gameRunning) {
        playIntroMuisc();
    }
    else if (!backgroundMusicPlaying && gameRunning && !world.character.isDead()) {
        playBackgroundMusic();
    }
}


function pauseAllMusic() {
    introMusicPlaying = false;
    backgroundMusicPlaying = false;
    audio_intro.volume = 0;
    audio_background.volume = 0;
    audio_intro.pause();
    audio_background.pause();
    clearInterval(backgroundMusicInterval);
}


function playIntroMuisc() {
    introMusicPlaying = true;
    audio_intro.currentTime = 0;
    audio_intro.volume = 0.1;
    audio_intro.play();
}


function playBackgroundMusic() {
    backgroundMusicPlaying = true;
    audio_background.currentTime = 0;
    audio_background.volume = 0.1;
    audio_background.play();
    replayBackgroundmusic();
}


function playBackgroundMusicGamestart() {
    backgroundMusicPlaying = true;
    audio_background.currentTime = 0;
    audio_background.play();
    replayBackgroundmusic();
}


function replayBackgroundmusic() {
    backgroundMusicInterval = setInterval(() => {
        if (!world.character.isDead()) {
            audio_background.currentTime = 0;
            audio_background.play();
        }
    }, 94000);
}


function playMusicWin() {
    audio_win.currentTime = 0;
    audio_win.play();
}


function playSoundCoin(coin) {
    if (!coin.collected) {
        audio_coin.currentTime = 0;
        audio_coin.play();
    }
}


function playSoundBottle(bottle) {
    if (!bottle.collected) {
        audio_bottle.play();
    }
}


function playSoundBottleSplash() {
    audio_splash.play();
}


function playRandomHurtSound() {
    if (!hurtSoundPlayed) {
        hurtSoundPlayed = true;
        hurtedFeelings[getRandomIndex()].play();
        setTimeout(() => hurtSoundPlayed = false, 1000);
    }
}


function getRandomIndex() {
    return Math.round(Math.random() * 2);
}


function playSoundBoss() {
    audio_boss.play();
}


function playSoundDeadChicken() {
    audio_chicken.play();
}