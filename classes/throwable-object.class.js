class ThrowableObject extends MovableObject {

    offsetX = 0;
    offsetY = 0;

    bottleMoveX;
    splashed = false;
    
    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');

        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;

        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw();
    }



    throw() {
        this.speedY = 10;
        this.speed = 10;
        this.applyGravity();
        if (!world.character.otherDirection) {
            this.bottleMoveX = setInterval(() => {
                this.moveRight();
            }, 20); 
        } else {
            this.bottleMoveX = setInterval(() => {
                this.moveLeft();
            }, 20); 
        }
    }
}