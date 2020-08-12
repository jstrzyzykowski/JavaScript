// Objects
const boardObj = new Board();

// DOM elements
let drawBoardBtn;
let boardDiv;
let fieldsDivs = [];



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
    const boardHeight = boardObj.boardHeight;
    const boardFieldSize = boardObj.boardFieldSize;

    boardDiv = document.createElement('div');
    boardDiv.classList.add('board');
    boardDiv.classList.add('clearfix');

    boardObj.fields.forEach(field => {

    });


    document.body.appendChild(boardDiv);
}




document.addEventListener('DOMContentLoaded', main);