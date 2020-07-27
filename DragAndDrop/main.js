const squareDiv = document.querySelector('.square');

let isActive = false;
let insertDivX;
let insertDivY;

squareDiv.addEventListener('mousedown', (e) => {
    squareDiv.style.backgroundColor = 'rgb(255, 71, 82)';

    insertDivX = e.offsetX;
    insertDivY = e.offsetY;

    isActive = true;
});

squareDiv.addEventListener('mousemove', (e) => {
    if (isActive) {
        squareDiv.style.top = `${e.clientY - insertDivY}px`;
        squareDiv.style.left = `${e.clientX - insertDivX}px`;
    }

});

squareDiv.addEventListener('mouseup', () => {
    squareDiv.style.backgroundColor = "#333";
    isActive = false;
});