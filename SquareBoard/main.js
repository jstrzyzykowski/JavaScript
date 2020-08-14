// Objects
const boardObj = new Board(5, 5, 50, 1);

// DOM elements
let drawBoardBtn;
let boardDiv;
let fieldsDivs = [];
let imagesSrcs = [];



const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    // drawBoard();

}

const prepareDOMElements = () => {
    drawBoardBtn = document.querySelector('div.draw-board')
}

const prepareDOMEvents = () => {
    drawBoardBtn.addEventListener('click', function() {
        drawBoardBtn.classList.add('hide');
        drawBoard();
    });
}

const drawBoard = () => {
    const boardWidth = boardObj.boardWidth;
    const boardFieldSize = boardObj.boardFieldSize;
    const boardFieldMargin = boardObj.boardFieldMargin;


    boardDiv = document.createElement('div');
    // width: calc(5 * 50px + 5 * 2px);
    // height: calc(5 * 50px + 5 * 2px);
    boardDiv.style.width = `${boardWidth * boardFieldSize + boardWidth * (boardFieldMargin * 2)}px`;
    boardDiv.classList.add('board');
    boardDiv.classList.add('clearfix');

    boardObj.fields.forEach((field, index) => {
        const fieldDiv = document.createElement('div');
        fieldDiv.style.width = `${boardObj.boardFieldSize}px`;
        fieldDiv.style.height = `${boardObj.boardFieldSize}px`;
        fieldDiv.style.margin = `${boardObj.boardFieldMargin}px`;

        fieldDiv.classList.add('field');

        const label = document.createElement('p');
        label.innerText = `${field.id}`;

        fieldDiv.appendChild(label);
        boardDiv.appendChild(fieldDiv);
    });


    document.body.appendChild(boardDiv);
}




document.addEventListener('DOMContentLoaded', main);