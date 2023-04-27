class Coin extends MovableObject {
    x = 300 + Math.random() * 2000;
    y = 300 - Math.random() * 100;
    height = 100;
    width = 100;
    offsetX = 20;
    offsetY = 20;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}