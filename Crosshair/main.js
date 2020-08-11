// Objects
let crosshairObj;

// DOM elements
let crosshairDiv;
let soundsAudio;
let shotDotsDiv;
let birdsDiv;

// Other containers
let shotDotsArr = [];
let birds = [];
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
    window.addEventListener('click', shot);
    setInterval(cleanShotDots, 3000);
    spawnInterval = setInterval(spawnBirds, 5000);
}

const createCrosshair = () => {
    crosshairObj = new Crosshair(5, 'red');

    crosshairDiv = document.createElement('div')
    crosshairDiv.classList.add('crosshair');
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

const shot = (e) => {
    const shotPosX = e.clientX;
    const shotPosY = e.clientY;
    soundsAudio[0].currentTime = 0;
    soundsAudio[0].play();

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
}

const cleanShotDots = () => {
    if (shotDotsArr.length > 0) {
        shotDotsArr = [];
        shotDotsDiv.innerText = '';
    }
}

const spawnBirds = () => {

    if (birds.length < 10) {
        const root = document.documentElement;

        const randomStart = Math.floor(Math.random() * (window.innerHeight - 117));
        const randomEnd = Math.floor(Math.random() * (window.innerHeight - 117));

        root.style.setProperty('--moveBirdStart', `${randomStart}px`);
        root.style.setProperty('--moveBirdEnd', `${randomEnd}px`);

        const bird = document.createElement('div');
        bird.classList.add('bird');

        birds.push(bird);
        birdsDiv.appendChild(bird);
        console.log(birds.length);
    } else {
        clearInterval(spawnInterval);
        birds = [];
        birdsDiv.innerText = '';
        console.log('KONIEC!!!');
    }
}


document.addEventListener('DOMContentLoaded', main);