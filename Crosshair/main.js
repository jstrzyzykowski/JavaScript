// Objects
let crosshairObj;
let birdsObjs = [];

// DOM elements
let crosshairDiv;
let soundsAudio;
let shotDotsDiv;
let birdsDiv;

// Other containers
let shotDotsArr = [];
let spawnInterval;

const main = () => {
    createCrosshair();
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    soundsAudio = document.querySelectorAll('.soundEffect');
    shotDotsDiv = document.querySelector('.shotDots');
    birdsDiv = document.querySelector('.birds');
}

const prepareDOMEvents = () => {
    window.addEventListener('mousemove', moveCrosshair);
    window.addEventListener('click', checkClick);
    setInterval(cleanShotDots, 5000);
    spawnInterval = setInterval(spawnBirds, 2000);
}

const createCrosshair = () => {
    crosshairObj = new Crosshair(window.innerWidth / 2, window.innerHeight / 2, 5, 'red');

    crosshairDiv = document.createElement('div')
    crosshairDiv.classList.add('crosshair');
    crosshairDiv.style.top = `${crosshairObj.posY}px`;
    crosshairDiv.style.left = `${crosshairObj.posX}px`;
    crosshairDiv.style.width = `${crosshairObj.getSize() * 10}px`;
    crosshairDiv.style.height = `${crosshairObj.getSize() * 10}px`;
    crosshairDiv.style.borderColor = `${crosshairObj.getColor()}`;


    const axisX = document.createElement('div')
    axisX.classList.add('axisX');
    axisX.style.backgroundColor = `${crosshairObj.getColor()}`;

    const axisY = document.createElement('div')
    axisY.classList.add('axisY');
    axisY.style.backgroundColor = `${crosshairObj.getColor()}`;

    crosshairDiv.appendChild(axisX);
    crosshairDiv.appendChild(axisY);

    document.body.appendChild(crosshairDiv);
}

const moveCrosshair = (e) => {
    const mousePosX = e.clientX;
    const mousePosY = e.clientY;

    crosshairObj.setPosition(mousePosX, mousePosY);

    crosshairDiv.style.left = `${crosshairObj.getPosition()[0]}px`;
    crosshairDiv.style.top = `${crosshairObj.getPosition()[1]}px`;
}

const checkClick = (e) => {

    const shotPosX = e.clientX;
    const shotPosY = e.clientY;

    // if (shotPosX > 700 && shotPosX <= 710 && shotPosY > 20 && shotPosY < 50) console.log('TRAFIONY PUNKT');

    const shotDot = document.createElement('div');
    shotDot.classList.add('shotDot');
    shotDot.style.left = `${shotPosX}px`;
    shotDot.style.top = `${shotPosY}px`;

    const poslabel = document.createElement('div');
    poslabel.classList.add('posLabel');
    poslabel.innerHTML = `<p><span class="valueX">X:${shotPosX}</span><span class="valueY">Y:${shotPosY}</span></p>`;
    shotDot.appendChild(poslabel);

    shotDotsArr.push(shotDot);
    shotDotsDiv.appendChild(shotDot);

    soundsAudio[0].currentTime = 0;
    soundsAudio[0].play();
}

const cleanShotDots = () => {
    if (shotDotsArr.length > 0) {
        shotDotsArr = [];
        shotDotsDiv.innerText = '';
    }
}

const spawnBirds = () => {

    if (birdsObjs.length < 5) {

        const randomStart = Math.floor(Math.random() * (window.innerHeight - 117));
        const randomEnd = Math.floor(Math.random() * (window.innerHeight - 117));

        const newBirdObj = new Bird([randomStart, randomEnd]);
        birdsObjs.push(newBirdObj);

        document.documentElement.style.setProperty('--moveBirdStart', `${randomStart}px`);

        document.documentElement.style.setProperty('--moveBirdEnd', `${randomEnd}px`);

        // Render
        const newBirdDiv = document.createElement('div');
        newBirdDiv.classList.add('bird');
        newBirdDiv.style.top = `${newBirdObj.getStartPosition()}px`;
        birdsDiv.appendChild(newBirdDiv);

    } else {
        clearInterval(spawnInterval);
        birdsObjs = [];
        birdsDiv.innerText = '';
    }
}


document.addEventListener('DOMContentLoaded', main);