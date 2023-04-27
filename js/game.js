const canvas = document.getElementById('canvas');
const startButton = document.getElementById('startButton');
const klaus = document.getElementById('klaus');
const dieter = document.getElementById('dieter');
const seppel = document.getElementById('seppel');
const rüdiger = document.getElementById('rüdiger');
const gameWon = document.getElementById('gameWon');
const musicToggleBtn = document.getElementById('toggleMusic');
const headline = document.getElementById('headline');
const buttons = document.getElementById('button-container');
const description = document.getElementById('description');
const level = document.getElementById('level');
let world;
let keyboard  = new Keyboard();
let gameRunning = false;
let currentLevel = 1;

let screenRatio = 3/4;
canvas.height = canvas.width * screenRatio;


function init() {
    startButton.classList.remove('d-none');
    buttons.classList.add('d-none');
    gameRunning = false;
    //countFPS();    
}


function hideIntroOverlay(event) {
    event.stopPropagation();
    seppel.classList.add('d-none');
    setTimeout(() => klaus.classList.remove('d-none'), 500);
    audio_intro.play();
    introMusicPlaying = true;
}


function startGame(event) {
    event.stopPropagation();
    if (!gameRunning) {
        audio_intro.pause();
        startButton.classList.add('d-none');
        headline.classList.add('d-none');
        showLevel("Level 1");
        gameRunning = true;
        currentLevel = 1;
        canvas.classList.remove('d-none');
        buttons.classList.remove('d-none');
        initLevel1();
        world = new World(canvas, keyboard, level_1);
        playBackgroundMusicGamestart();
    }
}


function startLevel2() {
    setTimeout(() => {
        showLevel("Level 2");
        gameRunning = true;
        initLevel2();
        currentLevel = 2;
        world = new World(canvas, keyboard, level_2);
        playBackgroundMusicGamestart();
    }, 5000);
}


function showLevel(level) {
    this.level.classList.remove('d-none');
    this.level.innerHTML = level;
    setTimeout(() => {
        this.level.classList.add('d-none');
    }, 3000);
}


function hideOutroOverlay() {
    musicToggleBtn.classList.remove('d-none');
    headline.classList.remove('d-none');
    canvas.classList.add('d-none');
    rüdiger.classList.add('d-none');
    window.location.reload();
}


function showDescription(event) {
    event.stopPropagation();
    description.classList.remove('d-none');

}

/**
 * FPS counter that I found online.
 */
function countFPS() {
    const times = [];
    let fps;

    function refreshLoop() {
        window.requestAnimationFrame(() => {
            const now = performance.now();
            while (times.length > 0 && times[0] <= now - 1000) {
                times.shift();
            }
            times.push(now);
            fps = times.length;
            let fpsCounter = document.getElementById('fps');
            fpsCounter.innerHTML = `fps = ${fps}`;
            refreshLoop();
        });
    }

    refreshLoop();
}