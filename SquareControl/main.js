// Class Instances
let $boardObj;
let $playerObj;


// DOM Elements
let $boardDiv;
let $playerDiv;

const main = () => {
    createBoard();
    createPlayer();
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {

}

const prepareDOMEvents = () => {
    window.addEventListener('keydown', (e) => {
        const collisionValue = $playerObj.move(e.keyCode);
        checkCollision(collisionValue);
        doMove();
    });
}

const createBoard = () => {
    const boardWidth = 600;
    const boardHeight = 400;
    $boardObj = new Board(boardWidth, boardHeight);

    $boardDiv = document.createElement('div');
    $boardDiv.style.width = `${$boardObj.getBoardSize()[0]}px`;
    $boardDiv.style.height = `${$boardObj.getBoardSize()[1]}px`;
    $boardDiv.classList.add('board');
    $boardDiv.classList.add('normal');

    document.body.appendChild($boardDiv);
}

const createPlayer = () => {
    // const spawnX = $boardObj.getSpawnX();
    // const spawnY = $boardObj.getSpawnY();

    $playerObj = new Player('PlayerExample');

    $playerDiv = document.createElement('div');
    $playerDiv.style.left = `${$playerObj.getPosition()[0]}px`;
    $playerDiv.style.top = `${$playerObj.getPosition()[1]}px`;
    $playerDiv.classList.add('player');

    const nameSpan = document.createElement('span');
    nameSpan.innerText = $playerObj.getName();
    nameSpan.classList.add('name');

    const hpBarDiv = document.createElement('div');
    hpBarDiv.classList.add('hpBar');

    const bodyDiv = document.createElement('div');
    bodyDiv.classList.add('body');

    $playerDiv.appendChild(nameSpan);
    $playerDiv.appendChild(hpBarDiv);
    $playerDiv.appendChild(bodyDiv);
    $boardDiv.appendChild($playerDiv);

    doMove();
}

const doMove = () => {
    $playerDiv.style.left = `${$playerObj.getPosition()[0]}px`;
    $playerDiv.style.top = `${$playerObj.getPosition()[1]}px`;
}

const checkCollision = (collisionValue) => {
    if ($boardDiv.classList.contains('warning')) $boardDiv.classList.remove('warning');

    if ($boardDiv.classList.contains('alert')) $boardDiv.classList.remove('alert');

    if (collisionValue != 0) {
        $boardDiv.classList.add('alert');
    }
}

document.addEventListener('DOMContentLoaded', main);