class Board {
    constructor(width = 600, height = 400) {
        this.boardWidth = width;
        this.boardHeight = height;
        this.spawnerPosX = 260;
        this.spawnerPosY = 140;
    }

    getBoardSize() {
        return [this.boardWidth, this.boardHeight];
    }

    getSpawnX() {
        return this.spawnerPosX;
    }

    getSpawnY() {
        return this.spawnerPosY;
    }
}