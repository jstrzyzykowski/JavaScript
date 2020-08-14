class Board {
    constructor(boardWidth = 5, boardHeight = 5, oneFieldSize = 50, boardFieldMargin = 2) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.boardFieldSize = oneFieldSize;
        this.boardFieldMargin = boardFieldMargin;
        this.fields = [];

        for (let i = 0; i < boardWidth * boardHeight; i++) {
            this.fields.push(new Field(this.boardFieldSize, i));
        }
    }
}