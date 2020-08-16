// Objects
const boardObj = new Board(5, 5, 50, 1, "sounds/MenuSelectionClick.wav");

// DOM elements
let playDivBtn;
let boardDiv;
let fieldsDivs = [];
let imagesSrcs = [];



const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    playDivBtn = document.querySelector('.play-button');
    imagesSrcs = document.getElementsByTagName('img');
}

const prepareDOMEvents = () => {
    playDivBtn.addEventListener('click', function() {

        drawBoard();
    });
}

const drawBoard = () => {
    const boardWidth = boardObj.boardWidth;
    const boardFieldSize = boardObj.boardFieldSize;
    const boardFieldMargin = boardObj.boardFieldMargin;

    boardDiv = document.createElement('div');
    boardDiv.style.width = `${boardWidth * boardFieldSize + boardWidth * (boardFieldMargin * 2)}px`;
    boardDiv.classList.add('board');
    boardDiv.classList.add('clearfix');

    boardObj.fields.forEach((field, index) => {
        const randomUrl = Math.floor(Math.random() * imagesSrcs.length);
        field.imageUrl = `${imagesSrcs[randomUrl].currentSrc}`;

        const audioElement = document.createElement('audio');
        audioElement.src = `${field.soundEffectUrl}`;

        const fieldDiv = document.createElement('div');
        fieldDiv.style.width = `${boardObj.boardFieldSize}px`;
        fieldDiv.style.height = `${boardObj.boardFieldSize}px`;
        fieldDiv.style.margin = `${boardObj.boardFieldMargin}px`;
        fieldDiv.addEventListener('click', function() {
            if (field.isImageVisible) {
                this.style.backgroundImage = "";
                field.isImageVisible = false;
            } else {
                this.style.backgroundImage = `url(${field.imageUrl})`;
                field.isImageVisible = true;
            }

            audioElement.currentTime = 0;
            audioElement.play();

        });

        fieldDiv.classList.add('field');
        fieldDiv.classList.add('show-off');

        const label = document.createElement('p');
        label.innerText = `${field.id}`;

        fieldDiv.appendChild(label);
        boardDiv.appendChild(fieldDiv);
    });

    document.body.appendChild(boardDiv);
}




document.addEventListener('DOMContentLoaded', main);