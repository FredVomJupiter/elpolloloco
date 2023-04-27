class Chicken extends MovableObject {
    x = 600 + Math.random() * 2000;
    y = 450;
    height = 80;
    width = 80;
    offsetX = 20;
    offsetY = 0;

    deathSoundPlayed = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        
        this.loadImages(this.IMAGES_WALKING);
        this.animate();

        this.speed = 1 + Math.random() * 4;
        this.moveLeft();
    }

    
    animate() {
        this.moveChickenLeft();
        this.animateChickenWalking();
        this.animateDeadChicken();
    }


    moveChickenLeft() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
            if (this.x < -440) {
                this.x = 800;
            }
        }, 80);
    }


    animateChickenWalking() {
        setInterval(() => {
            if (this.energy === 100) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }


    animateDeadChicken() {
        setInterval(() => {
            if (this.isDead() && !this.isdead) {
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                this.speed = 0;
                this.isdead = true;
                !this.deathSoundPlayed ? playSoundDeadChicken() : "";
                this.deathSoundPlayed = true;
                setTimeout(() => this.removeDeadChicken(), 2000);
            }
        }, 100);
    }


    removeDeadChicken() {
        let removeThisIndex;
        world.level.enemies.forEach(enemy => {
            enemy.isDead() ? removeThisIndex = world.level.enemies.indexOf(enemy) : "";
        });
        world.level.enemies.splice(removeThisIndex, 1);
    }
}