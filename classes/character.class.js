class Character extends MovableObject {
    x = 100;
    y = 240;
    height = 300;
    width = 150;
    offsetX = 20;
    offsetY = 20;
    speed = 5;
    

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];


    world;


    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
    }


    animate() {
        audio_walking.pause();
        setInterval(() => {
            this.keyboardInteraction();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            this.playMovingAnimations();
        }, 80);

        setInterval(() => {
            this.playIdleAnimation();
        }, 200);
    }


    keyboardInteraction() {
        if (this.canMoveRight()) {
            this.moveRight();
        }
        if (this.canMoveLeft()) {
            this.moveLeft();
        }
        if (this.canJump()) {
            this.jump();
        }
    }


    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead() && !this.isHurt() && gameRunning;
    }


    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0 && !this.isDead() && gameRunning;
    }


    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround() && !this.isDead() && !this.isHurt() && gameRunning;
    }


    playMovingAnimations() {
        if (this.isHurtCharacter()) {
            this.playAnimation(this.IMAGES_HURT);
            playRandomHurtSound();
        }
        if (this.isJumpingCharacter()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
        if (this.isWalkingCharacter()) {
            this.playAnimation(this.IMAGES_WALKING);
            audio_walking.play();
        }
    }


    isHurtCharacter() {
        return this.isHurt() && !this.isDead() && gameRunning;
    }


    isJumpingCharacter() {
        return this.isAboveGround() && !this.isHurt() && gameRunning;
    }


    isWalkingCharacter() {
        return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isDead() && !this.isHurt() && !this.isAboveGround() && gameRunning;
    }


    playIdleAnimation() {
        if (this.characterIsIdle()) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }


    characterIsIdle() {
        return !this.isHurt() && !this.isAboveGround() && !this.isDead() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT;
    }


    collectBottles(bottle) {
        if (!bottle.collected) { //Only apply gravity and count bottle if (collected = false) => coin not collected before.
            bottle.applyGravity();
            this.collectedBottles += 1;
            bottle.collected = true;
        }
    }


    collectCoins(coin) {
        if (!coin.collected) { //Only apply gravity and count coins if (collected = false) => coin not collected before.
            coin.speedY = 15;
            coin.applyGravity();
            setInterval(() => {
                coin.x -= 10;
            }, 25)
            this.collectedCoins += 1;
            coin.collected = true;
        }
    }


    bounceBack(enemy) {
        if (!enemy.isDead()) {
            this.speedY = 30;
            this.characterBehindEndboss(enemy) ? this.bounceWithDamage() : this.x -= 30;
        }
    }


    characterBehindEndboss(enemy) {
        return this.x + this.width > enemy.x && enemy instanceof Endboss;
    }


    bounceWithDamage() {
        this.x -= 70;
        this.hit("boss");
        world.healthBar.setPercentage(this.energy, "health");
    }


    jump() {
        this.speedY = 30;
    }


    getX() {
        return this.x;
    }


    setX(newX) {
        this.x = newX;
    }
}