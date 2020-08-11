class Crosshair {
    constructor(posX, posY, size, color) {
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.color = color;
    }

    getPosition() {
        return [this.posX, this.posY];
    }

    setPosition(newPosX, newPosY) {
        this.posX = newPosX;
        this.posY = newPosY;
    }

    getSize() {
        return this.size;
    }

    setSize(newSize) {
        this.size = newSize;
    }

    getColor() {
        return this.color;
    }

    setColor(newColor) {
        this.color = newColor;
    }
}