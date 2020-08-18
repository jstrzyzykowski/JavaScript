// Objects
let boardObj;

// DOM elements
let gameLevelDiv;
let playDivBtn;
let boardDiv;
let fieldsDivs = [];
let images = [];
let imagesSrcs = [];


// Game containers
// let memoryImages = [];
let userClickNumber = 1;
let currentPair = [];


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    gameLevelDiv = document.querySelector('.game-level');
    playDivBtn = document.querySelector('.play-button');
    images = [...document.querySelectorAll('img')];

    for (let i = 0; i < images.length; i++) {
        imagesSrcs.push(images[i].currentSrc);
        imagesSrcs.push(images[i].currentSrc);
    }

    // for (let i = 0; i < imagesSrcs.length; i++) {
    //     memoryImages.push(new MemoryImage(imagesSrcs[i].currentSrc));
    //     memoryImages.push(new MemoryImage(imagesSrcs[i].currentSrc));
    // }
}

const prepareDOMEvents = () => {
    playDivBtn.addEventListener('click', function() {
        const chooseSize = document.querySelector("input[name=boardSize]:checked").value;
        // console.log(chooseSize);
        boardObj = new Board(chooseSize, 50, 1, "sounds/MenuSelectionClick.wav");
        gameLevelDiv.classList.add('hide');
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

    boardObj.fields.forEach(field => {

        // Set memory pairs on the board
        const randomUrl = Math.floor(Math.random() * imagesSrcs.length);
        // console.log(`imagesSrcs.length => ${imagesSrcs.length}`);
        field.memoryImage.url = imagesSrcs[randomUrl];
        imagesSrcs.splice(randomUrl, 1);
        // console.log('SPLICED');


        // field.memoryImage.url = `${imagesSrcs[randomUrl].currentSrc}`;
        // field.memoryImage.timesUsed++;

        const audioElement = document.createElement('audio');
        audioElement.src = `${field.soundEffectUrl}`;

        const fieldDiv = document.createElement('div');
        fieldDiv.style.width = `${boardObj.boardFieldSize}px`;
        fieldDiv.style.height = `${boardObj.boardFieldSize}px`;
        fieldDiv.style.margin = `${boardObj.boardFieldMargin}px`;
        fieldDiv.dataset.id = field.id;

        fieldDiv.addEventListener('click', function() {

            // Status
            // 0 - UNKNOWN
            // 1 - CHECKING
            // 2 - COMPLETED
            // 3 - REDRAW

            check(this);
            redrawBoard();
            playSoundEffect(audioElement);

            // // ====================================
            // if (field.isImageVisible) {
            //     this.style.backgroundImage = "";
            //     field.isImageVisible = false;
            // } else {
            //     this.style.backgroundImage = `url(${field.memoryImage.url})`;
            //     field.isImageVisible = true;
            // }

            // audioElement.currentTime = 0;
            // audioElement.play();
            // // ====================================
        });

        fieldDiv.classList.add('field');
        fieldDiv.classList.add('show-off');

        boardDiv.appendChild(fieldDiv);
    });

    document.body.appendChild(boardDiv);
}

function check(fieldDiv) {
    const fieldObj = boardObj.fields[fieldDiv.dataset.id];

    if (fieldObj.status === 0) {

        fieldObj.status = 1;

        currentPair.push(fieldObj);

        if (currentPair.length === 2) {
            if (currentPair[0].memoryImage.url === currentPair[1].memoryImage.url) {
                currentPair.forEach(fieldObj => {
                    fieldObj.status = 2;
                });
                currentPair = [];
            } else {
                currentPair.forEach(fieldObj => {
                    fieldObj.status = 0;
                });
                currentPair = [];
            }
        }
    }
}

const redrawBoard = () => {
    boardObj.fields.forEach(fieldObj => {

        const fieldDiv = document.querySelector(`[data-id="${fieldObj.id}"]`);

        if (fieldObj.status === 1 || fieldObj.status === 2) {
            fieldDiv.style.backgroundImage = `url(${fieldObj.memoryImage.url})`;
        } else {
            fieldDiv.style.backgroundImage = "";
        }
    });
}

const playSoundEffect = (audioElement) => {
    audioElement.currentTime = 0;
    audioElement.play();
}




document.addEventListener('DOMContentLoaded', main);