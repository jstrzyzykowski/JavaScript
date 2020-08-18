class Board {
    constructor(boardSize = 'small', oneFieldSize = 50, boardFieldMargin = 2, fieldSoundEffectUrl) {

        switch (boardSize) {
            case 'small':
                this.boardWidth = 4;
                this.boardHeight = 4;
                break;
            case 'medium':
                this.boardWidth = 6;
                this.boardHeight = 6;
                break;
            case 'large':
                this.boardWidth = 8;
                this.boardHeight = 8;
                break;
        }

        this.boardFieldSize = oneFieldSize;
        this.boardFieldMargin = boardFieldMargin;
        this.fields = [];

        for (let i = 0; i < this.boardWidth * this.boardHeight; i++) {
            this.fields.push(new Field(this.boardFieldSize, i, fieldSoundEffectUrl));
        }
    }
}