class Cloud extends MovableObject {
    x = 0;
    y = 50;
    height = 300;
    width = 500;


    constructor(imgPath, startPosition) {
        super().loadImage(imgPath);
        this.x = startPosition;
        this.moveLeft();
    }
 
    
    moveLeft() {
        setInterval(() => {
            this.x -= 1;
            if (this.x < -440) {
                this.x = 800;
            }
        }, 80);
    }
}