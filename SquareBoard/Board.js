class Board {
    constructor(boardWidth = 4, boardHeight = 4, oneFieldSize = 50, boardFieldMargin = 2, fieldSoundEffectUrl) {

        boardWidth % 2 === 0 ? this.boardWidth = boardWidth : this.boardWidth = 4;

        boardHeight % 2 === 0 ? this.boardWidth = boardWidth : this.boardWidth = 4;

        this.boardFieldSize = oneFieldSize;
        this.boardFieldMargin = boardFieldMargin;
        this.fields = [];

        for (let i = 0; i < boardWidth * boardHeight; i++) {
            this.fields.push(new Field(this.boardFieldSize, i, fieldSoundEffectUrl));
        }
    }
}