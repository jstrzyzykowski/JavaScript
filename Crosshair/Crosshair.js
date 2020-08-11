class Crosshair {
    constructor(size, color) {
        this.posX = 0;
        this.posY = 0;
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