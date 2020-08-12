class Square {
    constructor(squareSide, [posStartX, posStartY], [posEndX, posEndY]) {
        this.squareSide = squareSide;
        this.posStart = [posStartX, posStartY];
        this.posEnd = [posEndX, posEndY];
        this.posNow = [posStartX, posStartY];
    }

    // Prototype area
    getSquareSide() {
        return this.squareSide;
    }

    setSquareSide(newSqureSide) {
        this.squareSide = newSqureSide;
    }

    getPosStart() {
        return this.posStart;
    }

    getPosEnd() {
        return this.posEnd;
    }

    getPosNow() {
        return this.posNow;
    }

    updatePosNow(currentX, currentY) {
        this.posNow = [currentX, currentY];
    }
}