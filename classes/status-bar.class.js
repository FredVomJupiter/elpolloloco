class StatusBar extends DrawableObject {

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    percentage = 100;
    speed = 5;


    constructor(type) {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.loadImages(this.IMAGES_COINS);
        this.loadImages(this.IMAGES_BOTTLES);
        if (type === "health") {
            this.setPercentage(100, type);
            this.y = 30;
        } else if (type === "coins") {
            this.setPercentage(0, type);
            this.y = 80;
        } else {
            this.setPercentage(0, type);
            this.y = 130;
        }
        this.x = 50;
        this.width = 200;
        this.height = 60;

    }


    setPercentage(percentage, type) {
        this.percentage = percentage;
        let path;
        if (type === "health") {
            path = this.IMAGES_HEALTH[this.getImageIndex()];
        } else if (type === "coins") {
            path = this.IMAGES_COINS[this.getImageIndex()];
        } else {
            path = this.IMAGES_BOTTLES[this.getImageIndex()];
        }
        this.img = this.imageCache[path];
    }


    getImageIndex() {
        if (this.percentage == 0) {
            return 0;
        }
        else if (this.percentage <= 30 && this.percentage > 0) {
            return 1;
        }
        else if (this.percentage <= 50 && this.percentage > 3) {
            return 2;
        }
        else if (this.percentage <= 70 && this.percentage > 50) {
            return 3;
        }
        else if (this.percentage <= 90 && this.percentage > 70) {
            return 4;
        }
        else {
            return 5;
        }
    }
}