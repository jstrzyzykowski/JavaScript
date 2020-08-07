let $spinBtn;
let $wheelDiv;
let $animalsIcons = [...document.querySelectorAll('.animals i')];
let $ul;
let $checkBtnIcon;
let $alertP;

let spinValue;
let spinAnimalNumber;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    $spinBtn = document.querySelector('.spin');
    $wheelDiv = document.querySelector('.wheel');
    $ul = document.querySelector('.results');
    $checkBtnIcon = document.querySelector('.checkBtn i');
    $alertP = document.querySelector('.alert');
}

const prepareDOMEvents = () => {
    $spinBtn.addEventListener('click', spinWheel);
    $wheelDiv.addEventListener('animationend', finishSpinWheel);
    $checkBtnIcon.addEventListener('click', checkItemsInside);
}

const spinWheel = () => {
    $animalsIcons.forEach(icon => {
        icon.classList.remove('active');
    });
    spinValue = (5 * 360) + Math.floor(Math.random() * 4) * 90;
    spinAnimalNumber = (spinValue / 90) % 20;

    document.documentElement.style.setProperty('--spinValue', `${spinValue}deg`);
    $spinBtn.classList.add('disabled');
    $wheelDiv.classList.add('on');
}

const finishSpinWheel = () => {
    $wheelDiv.style.transform = `rotate(${spinValue}deg)`;
    $wheelDiv.classList.remove('on');
    $spinBtn.classList.remove('disabled');
    $animalsIcons[spinAnimalNumber].classList.add('active');

    // Add new result to list
    const li = document.createElement('li');
    switch (spinAnimalNumber) {
        case 0:
            li.innerText = 'Hippo';
            break;
        case 1:
            li.innerText = 'Spider';
            break;
        case 2:
            li.innerText = 'Kiwi';
            break;
        case 3:
            li.innerText = 'Horse';
            break;
    }

    $ul.appendChild(li);
    checkItemsInside();
}

const checkItemsInside = () => {
    if ($ul.innerText === "") $alertP.classList.toggle('hide');
    else $alertP.classList.add('hide');
}


document.addEventListener('DOMContentLoaded', main);