class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 20;
    y = 20;
    height = 50;
    width = 200;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
        * 
        * @param {*} array 
        */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        // Die blauen Frames werden nur angezeigt, wenn es sich um den Character oder die Chicken Klassen handelt.
        if (this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x + this.offsetX, this.y + this.offsetX, this.width - this.offsetX*2, this.height - this.offsetY*2);
            ctx.stroke();
        }
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x + this.offsetX, this.y + this.offsetY*4, this.width - this.offsetX*2, this.height - this.offsetY*4);
            ctx.stroke();
        }
    }

}