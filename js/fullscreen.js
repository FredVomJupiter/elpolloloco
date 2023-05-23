window.addEventListener("resize", () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    else {
        document.documentElement.requestFullscreen();
    }
}, false);