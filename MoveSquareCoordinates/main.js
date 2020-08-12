// Global objects
let squareObj;

// Global DOM
let squareDiv;

const main = () => {
    createSquare();
    setTimeout(moveSquare, 1000);
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {}

const prepareDOMEvents = () => {}

const createSquare = () => {
    squareObj = new Square(50, [window.innerWidth - 100, 300], [100, 300]);

    squareDiv = document.createElement('div');
    squareDiv.classList.add('square');

    squareDiv.style.width = `${squareObj.getSquareSide()}px`;
    squareDiv.style.height = `${squareObj.getSquareSide()}px`;
    squareDiv.style.top = `${squareObj.getPosStart()[1]}px`;
    squareDiv.style.left = `${squareObj.getPosStart()[0]}px`;

    const label = document.createElement('p');
    label.innerHTML = `<span class="pos-x">${squareObj.getPosNow()[0]}</span><span class="pos-y">${squareObj.getPosNow()[1]}</span>`;
    squareDiv.appendChild(label);

    document.body.appendChild(squareDiv);
}

const moveSquare = () => {
    let startX = squareObj.getPosStart()[0];
    let startY = squareObj.getPosStart()[1];
    let endX = squareObj.getPosEnd()[0];
    let endY = squareObj.getPosEnd()[1];

    let timer = setInterval(function() {
        if (startX === endX) {
            clearInterval(timer);
            return;
        }
        draw();
    }, 1);

    function draw() {
        if (startX != endX) startX -= 1;


        squareObj.updatePosNow(startX, startY);

        squareDiv.querySelector('span.pos-x').innerText = `${squareObj.getPosNow()[0]}`;
        squareDiv.querySelector('span.pos-y').innerText = `${squareObj.getPosNow()[1]}`;
        squareDiv.style.left = `${startX}px`;
    }
}


document.addEventListener('DOMContentLoaded', main);