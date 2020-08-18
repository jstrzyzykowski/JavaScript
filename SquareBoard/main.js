// Objects
let boardObj;

// DOM elements
let gameLevelDiv;
let playDivBtn;
let boardDiv;
let fieldsDivs = [];
let images = [];
let imagesSrcs = [];
let timerDiv;
let againDivBtn;


// Game containers
let time = 0;
let currentPair = [];
let timerInterval;


// =====================================================
// =====================================================


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

    timerDiv = document.querySelector('div.timer');
    againDivBtn = document.querySelector('div.again-button');
}

const prepareDOMEvents = () => {
    playDivBtn.addEventListener('click', play);
    againDivBtn.addEventListener('click', refreshPage);
}

// =====================================================
// =====================================================

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

        fieldsDivs.push(fieldDiv);
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

    if (result === boardObj.fields.length) {
        const completedAudio = document.createElement('audio');
        completedAudio.src = 'sounds/completed.wav';
        completedAudio.currentTime = 0;
        completedAudio.play();
        console.log('FINISHED');
        clearInterval(timerInterval);
        againDivBtn.classList.remove('hide');

    } else {
        console.log('The game is still running...');
    }
}

const refreshPage = () => {
    window.location.reload();
}

const play = () => {
    const chooseSize = document.querySelector("input[name=boardSize]:checked").value;
    const timerSpan = timerDiv.querySelector('p.current-time span');
    boardObj = new Board(chooseSize, 50, 1, "sounds/MenuSelectionClick.wav");
    gameLevelDiv.classList.add('hide');
    timerDiv.classList.remove('hide');
    timerInterval = setInterval(() => {
        time++;
        timerSpan.innerText = `${(time / 100).toFixed(1)}s`;
    }, 10);
    drawBoard();
}


document.addEventListener('DOMContentLoaded', main);