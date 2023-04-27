class BackgroundObject extends MovableObject {
    x = 0;
    y = 0;
    height = 600;
    width = 800;

    constructor(imagePath, position) {
        super().loadImage(imagePath);
        this.x = position;
    }
}