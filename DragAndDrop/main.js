const squareDiv = document.querySelector('.square');

let topDiv = 150;
let leftDiv = 150;

squareDiv.style.top = `${topDiv}px`;
squareDiv.style.left = `${leftDiv}px`;

let isActive = false;
let insertDivX;
let insertDivY;

const callElement = (e) => {
    // console.log(`X:${e.clientX} | Y:${e.clientY}`);
    squareDiv.style.top = `${e.clientY}px`;
    squareDiv.style.left = `${e.clientX}px`;

    squareDiv.animate([{
        top: `${e.clientY}px`,
        left: `${e.clientX}px`,
        transform: `translate(-50%, -50%)`
    }], {
        duration: 100,
        iterations: 1,
        fill: "both"
    });


}

const move = (direction) => {
    let value;

    if (direction === "up") {
        value = parseInt(squareDiv.style.top.split('').slice(0, -2).join(''));
        value -= 10;
        squareDiv.style.top = `${value}px`;
        console.log(`DIR:UP -> ${value}`);
    } else if (direction === "down") {
        value = parseInt(squareDiv.style.top.split('').slice(0, -2).join(''));
        value += 10;
        squareDiv.style.top = `${value}px`;
        console.log(`DIR:DOWN -> ${value}`);
    } else if (direction === "left") {
        value = parseInt(squareDiv.style.left.split('').slice(0, -2).join(''));
        value -= 10;
        squareDiv.style.left = `${value}px`;
        console.log(`DIR:LEFT -> ${value}`);
    } else {
        value = parseInt(squareDiv.style.left.split('').slice(0, -2).join(''));
        value += 10;
        squareDiv.style.left = `${value}px`;
        console.log(`DIR:RIGHT -> ${value}`);
    }
}

const moveElement = (e) => {
    switch (e.keyCode) {
        case 37:
            move("left");
            break;
        case 38:
            move("up")
            break;
        case 39:
            move("right")
            break;
        case 40:
            move("down")
            break;
    }

    console.log(e.keyCode)
}

// Events

window.addEventListener('click', callElement);

window.addEventListener('keydown', moveElement);

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