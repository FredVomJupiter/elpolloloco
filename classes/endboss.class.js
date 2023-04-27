class Endboss extends MovableObject {
    y = 320;
    height = 216;
    width = 216;
    offsetX = 30;
    offsetY = 30;
    lastTimeHurt;
    now;
    firstCollisionTime = 0;
    collisionWithBottle = false;

    playerSeen = false;
    turning = false;


    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_RUN = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_RUN);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 2500;
        this.animate();
    }


    animate() {
        this.defaultAnimation();
        this.deathAnimation();
        this.hurtAnimation();
        this.attackMoveAnimation();
    }


    defaultAnimation() {
        setInterval(() => {
            !this.isDead() && !this.isHurt() ? this.playAnimation(this.IMAGES_ALERT) : "";
        }, 200);
    }


    deathAnimation() {
        setInterval(() => {
            this.isDead() && !this.oneSecondSinceDeathAnimationPlayed() ? this.playDeathAnimation() : "";
            this.isDead() && this.oneSecondSinceDeathAnimationPlayed() ? this.endDeathAnimation() : "";
        }, 100);
    }


    hurtAnimation() {
        setInterval(() => {
            this.isHurt() ? this.playHurtAnimation() : "";
        }, 100);
    }


    attackMoveAnimation() {
        setInterval(() => {
            if (this.conditionsForChargeTrue()) {
                this.playChargeAnimation();
            } else if (this.conditionsForAttackTrue()) {
                this.playAttackAnimation();
            } else if (this.conditionsForRunningTrue()) {
                this.playRunAnimation();
            } else if (this.conditionsForReverseRunningTrue()) {
                this.playRunReverseAnimation();
            }
        }, 200);
        setInterval(() => {
            this.seeingPlayer();
            this.reachedLeftEndpoint();
            this.reachedRightEndpoint();
        }, 200);
    }


    oneSecondSinceDeathAnimationPlayed() {
        this.now = new Date().getTime();
        return (this.now - this.lastTimeHurt) > 1000
    }


    playDeathAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
        this.y = 350;
        this.isdead = true;
    }


    endDeathAnimation() {
        this.loadImage('img/4_enemie_boss_chicken/5_dead/G26.png');
        this.speed = 0;
    }


    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        this.speed = 0;
        this.lastTimeHurt = new Date().getTime();
    }


    conditionsForAttackTrue() {
        return !this.isDead() && !this.isHurt() && (world.character.isColliding(this) || world.characterCollisionWithoutDamage(this)) && gameRunning;
    }


    conditionsForRunningTrue() {
        return this.playerSeen && !this.isDead() && !this.isHurt() && !world.character.isColliding(this);
    }


    conditionsForReverseRunningTrue() {
        return this.turning && !this.isDead() && !this.isHurt() && !world.character.isColliding(this);
    }


    conditionsForChargeTrue() {
        return this.isHurt() && !this.isDead() && !world.character.isColliding(this);
    }


    seeingPlayer() {
        if (world.character.x >= 2000) {
            this.playerSeen = true;
        }
    }


    reachedLeftEndpoint() {
        if (this.x < 1500) {
            this.playerSeen = false;
            this.turning = true;
        }
    }


    reachedRightEndpoint() {
        if (this.x > 2400) {
            this.turning = false;
        }
    }


    playRunAnimation() {
        this.playAnimation(this.IMAGES_RUN);
        this.speed = 30;
        this.moveLeft();
    }


    playRunReverseAnimation() {
        this.playAnimation(this.IMAGES_RUN);
        this.speed = 90;
        this.moveRight();
    }


    playAttackAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
        this.speed = 0;
        playSoundBoss();
    }


    playChargeAnimation() {
        this.playAnimation(this.IMAGES_RUN);
        this.speed = 70;
        this.moveLeft();
        playSoundBoss();
    }


    calculateBottleHit() {
        this.now = new Date().getTime();
        if (!this.collisionWithBottle) {
            this.firstCollisionTime = new Date().getTime();
            this.collisionWithBottle = true; // First hit will switch this boolean to true and prevent further collisions of the same bottle to be countet as hits.
            this.hit("bottle");
        } else if (this.oneSecondSinceLastBottleCollision()) {
            this.collisionWithBottle = false; // After one second since the last collision with bottle, the boolean will be set false again => thus, only one hit per bottle possible
        }
    }


    oneSecondSinceLastBottleCollision() {
        return this.now - this.firstCollisionTime > 1000;
    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = true;
    }


    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = false;
    }
}