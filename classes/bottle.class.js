class Bottle extends MovableObject {
    x = 300 + Math.random() * 1500;
    y = 470;
    height = 50;
    width = 60;
    offsetX = 0;
    offsetY = 0;

    IMAGE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    

    constructor(level) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        level === "level_2" ? this.x = 100 + Math.random() * 500 : "";
    }
}