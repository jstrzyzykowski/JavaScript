// Objects
let boardObj;

// DOM elements
let gameLevelDiv;
let playDivBtn;
let boardDiv;
let fieldsDivs = [];
let images = [];
let imagesSrcs = [];
let currentTimeSpn;


// Game containers
let time = 0;
let currentPair = [];
// let isGameFinished;



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

    currentTimeSpn = document.querySelector('.timer p.current-time span');
}

const prepareDOMEvents = () => {
    playDivBtn.addEventListener('click', function() {
        const chooseSize = document.querySelector("input[name=boardSize]:checked").value;
        boardObj = new Board(chooseSize, 50, 1, "sounds/MenuSelectionClick.wav");
        gameLevelDiv.classList.add('hide');
        setInterval(() => {
            time++;
            currentTimeSpn.innerText = `${(time / 100).toFixed(1)}s`;
        }, 10);
        isGameFinished = false;
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
        field.memoryImage.url = imagesSrcs[randomUrl];
        imagesSrcs.splice(randomUrl, 1);

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

            checkPair(this);
            checkGameFinished();
            redrawBoard();
            playSoundEffect(audioElement);
        });

        fieldDiv.classList.add('field');
        fieldDiv.classList.add('show-off');

        boardDiv.appendChild(fieldDiv);
    });

    document.body.appendChild(boardDiv);
}

function checkPair(fieldDiv) {
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
                    fieldObj.status = 3;
                });
                currentPair = [];
            }
        }
    }
}

const redrawBoard = () => {


    boardObj.fields.forEach(fieldObj => {

        const fieldDiv = document.querySelector(`[data-id="${fieldObj.id}"]`);

        if (fieldObj.status === 0) {
            fieldDiv.style.backgroundImage = "";
        } else if (fieldObj.status === 1 || fieldObj.status === 2) {
            fieldDiv.style.backgroundImage = `url(${fieldObj.memoryImage.url})`;
        } else {
            fieldDiv.style.backgroundImage = `url(${fieldObj.memoryImage.url})`;
            fieldObj.status = 0;
            setTimeout(() => {
                fieldDiv.style.backgroundImage = "";
            }, 500);
        }
    });
}

const playSoundEffect = (audioElement) => {
    audioElement.currentTime = 0;
    audioElement.play();
}

const checkGameFinished = () => {
    let result = 0;

    boardObj.fields.forEach(fieldObj => {
        if (fieldObj.status === 2) result++;
    });

    if (result === boardObj.fields.length) console.log('FINISHED');
    else {
        // GAME RESET HERE
        console.log('The game is still running...');
    }
}


document.addEventListener('DOMContentLoaded', main);