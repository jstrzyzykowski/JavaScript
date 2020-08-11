class Bird {
    constructor([startTop, endTop]) {
        this.startTopPos = startTop;
        this.endTopPos = endTop;
        this.currentPos = [0, 0];
    }

    getStartPosition() {
        return this.startTopPos;
    }

    setStartPosition(newStartTop) {
        this.startTopPos = newStartTop;
    }

    getEndPosition() {
        return this.endTopPos;
    }

    setEndPosition(newEndTop) {
        this.endTopPos = newEndTop;
    }

    getCurrentPosition() {
        return this.currentPos;
    }

    updateCurrentPos(posX, posY) {
        this.currentPos = [posX, posY];
    }
}