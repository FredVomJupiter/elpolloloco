class World {
    character = new Character();
    level = level_1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar("health");
    coinBar = new StatusBar("coins");
    bottleBar = new StatusBar("bottles");
    throwableObjects = [];
    lastTimeThrown = new Date().getTime();
    currentTime;



    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.draw();
        this.setWorld();
        this.runChecks();
    }


    setWorld() {
        this.character.world = this;
    }


    runChecks() {

        setInterval(() => {
            this.checkCollisions();
            this.checkThrowingObjects();
            this.checkBottleHit();
            this.checkCharacterDeath();
            this.checkBottleSplash();
            this.checkWin();
        }, 100);
        setInterval(() => {
            this.collectingCoin();
            this.collectingBottle();
        }, 200);

    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.characterCollisionMeetsConditionForDamage(enemy)) {
                this.applyDamageEffects(enemy);
            } else if (this.characterCollisionWithoutDamage(enemy)) {
                this.isChickenOrBabychicken(enemy) ? this.damageEnemyInstead(enemy) : this.character.bounceBack(enemy);
            }
        });
    }


    characterCollisionMeetsConditionForDamage(enemy) {
        return this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isdead && !this.character.isDead();
    }


    applyDamageEffects(enemy) {
        this.character.hit("chicken");
        this.character.bounceBack(enemy);
        this.healthBar.setPercentage(this.character.energy, "health");
    }


    characterCollisionWithoutDamage(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && !this.character.isDead() && (this.character.y + this.character.height) < 490;
    }


    isChickenOrBabychicken(enemy) {
        return enemy instanceof Chicken || enemy instanceof Babychicken;
    }


    damageEnemyInstead(enemy) {
        return enemy.energy = 0;
    }


    checkCharacterDeath() {
        if (gameRunning) {
            this.character.isDead() ? this.gameOver() : "";
        }
    }


    checkWin() {
        if (gameRunning) {
            !this.character.isDead() && this.endbossDead() && currentLevel === 1 ? this.nextLevel() : "";
            !this.character.isDead() && this.allEnemiesDead() && currentLevel === 2 ? this.gameWon() : "";
        }
    }


    endbossDead() {
        let endbossDead;
        this.level.enemies.forEach(enemy => {
            enemy instanceof Endboss && enemy.isDead() ? endbossDead = true : endbossDead = false;
        });
        return endbossDead;
    }


    allEnemiesDead() {
        return this.level.enemies.length === 0;
    }


    checkBottleSplash() {
        this.throwableObjects.forEach((bottle) => {
            if (this.bottleTouchesGround(bottle)) {
                this.bottleSplashEffects(bottle);
            }
        });
    }


    bottleTouchesGround(bottle) {
        return !bottle.isAboveGround() && !bottle.splashed;
    }


    bottleSplashEffects(bottle) {
        clearInterval(bottle.bottleMoveX);
        playSoundBottleSplash();
        bottle.playAnimation(bottle.IMAGES_SPLASH);
        setTimeout(() => this.splashBottle(bottle), 100);
        setTimeout(() => this.removeSplashedBottle(), 3000);
    }


    splashBottle(bottle) { 
        bottle.y = 481;
        bottle.splashed = true
    }


    removeSplashedBottle() {
        this.throwableObjects.splice(0, 1);
    }


    gameOver() {
        clearInterval(backgroundMusicInterval);
        audio_background.pause();
        gameRunning = false;
        audio_death.play();
        this.character.playAnimation(this.character.IMAGES_DEAD);
        this.character.loadImage('img/2_character_pepe/5_dead/D-56.png');
        setTimeout(() => {
            gameLost.classList.remove('d-none');
            musicToggleBtn.classList.add('d-none');
        }, 1000);
    }


    gameWon() {
        clearInterval(backgroundMusicInterval);
        audio_background.pause();
        playMusicWin();
        gameRunning = false;
        setTimeout(() => {
            gameWon.classList.remove('d-none');
            musicToggleBtn.classList.add('d-none');
        }, 1000);
    }


    nextLevel() {
        clearInterval(backgroundMusicInterval);
        audio_background.pause();
        playMusicWin();
        setTimeout(() => {
            audio_win.pause();
        }, 3500);
        gameRunning = false;
        startLevel2();
    }


    collectingCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                playSoundCoin(coin);
                this.character.collectCoins(coin);
                this.coinBar.setPercentage(this.character.collectedCoins * 5, "coins"); // Coins collection calculated with factor 5
            }
        })
    }


    collectingBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                playSoundBottle(bottle);
                this.character.collectBottles(bottle);
                this.bottleBar.setPercentage(this.character.collectedBottles * 10, "bottles"); // Bottle collection factor 10
            }
        })
    }


    checkThrowingObjects() {
        if (this.keyboard.THROW) {
            if (this.character.collectedBottles > 0 && this.isOneSecondSinceLastThrow()) {
                this.character.collectedBottles--;
                this.bottleBar.setPercentage(this.character.collectedBottles * 10, "bottles");
                let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 70);
                this.throwableObjects.push(bottle);
            }
        }
    }


    checkBottleHit() {
        if (this.throwableObjects.length > 0) {
            this.level.enemies.forEach((enemy) => {
                if (this.thrownBottleMeetsConditionsForCollision(enemy)) {
                    // If normal chicken => instant death; if boss chicken => calculateHit();
                    enemy instanceof Chicken || enemy instanceof Babychicken ? enemy.energy = 0 : enemy.calculateBottleHit();
                }
            });
        }
    }


    thrownBottleMeetsConditionsForCollision(enemy) {
        // Always and only checks the last thrown bottle for collision and if it not has already splashed.
        return this.throwableObjects[0].isColliding(enemy) && !this.throwableObjects[0].splashed;
    }


    isOneSecondSinceLastThrow() {
        this.currentTime = new Date().getTime();
        if (this.currentTime - this.lastTimeThrown > 1200) {
            this.lastTimeThrown = new Date().getTime();
            return true;
        } else {
            return false;
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.camera_x < 0) {
            this.ctx.translate(this.camera_x, 0);
        }

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);


        if (this.camera_x < 0) {
            this.ctx.translate(-this.camera_x, 0);
        }
        // ------- Space for fixed objects ----- //
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);

        // -------                         ----- //
        if (this.camera_x < 0) {
            this.ctx.translate(this.camera_x, 0);
        }

        if (this.camera_x < 0) {
            this.ctx.translate(-this.camera_x, 0);
        }
        // Ruft immer wieder draw auf (MB Pro ca 60 FPS)
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }


    addToMap(movableObj) {
        // Hier findet die Spiegelung der Charakter-Bilder statt, wenn der Spieler nach links laufen will (keyA)
        if (movableObj.otherDirection) {
            this.flipImage(movableObj);
        }
        movableObj.draw(this.ctx);
        //movableObj.drawFrame(this.ctx); // Creating blue frames around movable objects for development purposes.

        if (movableObj.otherDirection) {
            this.flipImageBack(movableObj);
        }
    }


    flipImage(movableObj) {
        this.ctx.save();
        // Damit der Charakter nicht springt, muss er um seine width nach rechts verschoben werden
        // Der Sprung passiert aufgrund der Spiegelung
        this.ctx.translate(movableObj.width, 0);
        this.ctx.scale(-1, 1);
        // Umkehrung der x-Achse
        movableObj.x = movableObj.x * -1;
    }


    flipImageBack(movableObj) {
        this.ctx.restore();
        // Umkehrung der x-Achse
        movableObj.x = movableObj.x * -1;
    }
}