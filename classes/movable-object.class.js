class MovableObject extends DrawableObject {
    speed = 1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collectedCoins = 0;
    collectedBottles = 0;
    collected = false;
    isdead = false;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else if (this instanceof Character) {
                this.y = 240;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof Coin || this instanceof Bottle) {
            return true
        } else if (this instanceof ThrowableObject) {
            return this.y < 470;
        } else if (this instanceof Babychicken) {
            return this.y < 450;
        } else {
            return this.y < 240;
        }
    }


    isColliding (obj) {
        return  (this.x + this.width - this.offsetX*2) >= obj.x &&
                (this.y + this.height) >= obj.y &&
                this.y + this.offsetY*6 <= (obj.y + obj.height) &&
                (this.x + this.offsetX*2) <= (obj.x + obj.width);
    }


    hit(hitBy) {
        hitBy === "bottle" ? this.energy -= 20 : this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
            this.isdead = true;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; // Difference in s
        return timePassed < 1;
    }


    isDead() {
        return this.energy == 0;
    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    
    playAnimation(images) {
        let walkingLoop = this.currentImage % images.length; // Der Modulu % hilft, einen loop zu kreieren => 0%6=0,1%6=1, 2%6=2, 3%6=3, 4%6=4, 5%6=5, 6%6=0
        let path = images[walkingLoop];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}