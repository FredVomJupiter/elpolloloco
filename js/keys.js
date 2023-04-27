const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const btnJump = document.getElementById('jump');
const btnThrow = document.getElementById('throw');

/**
 * Key EventListener
 */
window.addEventListener("keypress", (event) => {
    let key = document.getElementById('key');
    key.innerHTML = "";
    key.innerHTML = "Key pressed: " + event.key;
    if (event.key === 'd' || event.key === 'D') {
        keyboard.RIGHT = true;
    }
    if (event.key === 'a' || event.key === 'A') {
        keyboard.LEFT = true;
    }
    if (event.key === ' ') {
        keyboard.SPACE = true;
    }
    if (event.key === 'e' || event.key === 'E') {
        keyboard.THROW = true;
    }
});


window.addEventListener("keyup", (event) => {
    if (event.key === 'd' || event.key === 'D') {
        keyboard.RIGHT = false;
    }
    if (event.key === 'a' || event.key === 'A') {
        keyboard.LEFT = false;
    }
    if (event.key === ' ') {
        keyboard.SPACE = false;
    }
    if (event.key === 'e' || event.key === 'E') {
        keyboard.THROW = false;
    }
});



btnLeft.addEventListener("touchstart", (event) => {
    keyboard.LEFT = true;
});

btnLeft.addEventListener("touchend", (event) => {
    keyboard.LEFT = false;
});

btnRight.addEventListener("touchstart", (event) => {
    keyboard.RIGHT = true;
});

btnRight.addEventListener("touchend", (event) => {
    keyboard.RIGHT = false;
});

btnJump.addEventListener("touchstart", (event) => {
    keyboard.SPACE = true;
});

btnJump.addEventListener("touchend", (event) => {
    keyboard.SPACE = false;
});

btnThrow.addEventListener("touchstart", (event) => {
    keyboard.THROW = true;
});

btnThrow.addEventListener("touchend", (event) => {
    keyboard.THROW = false;
});
