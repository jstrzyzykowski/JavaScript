// MAIN Food array
let $foods = [
    new Food('Chips and fish', 12),
    new Food('Burger', 14),
    new Food('Extra Food', 20),
    new Food('BeefStew', 200)
];
let $buttons = [];
let $buttonsDiv;
let $menuInfo;

// MAIN structure

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    $buttonsDiv = document.querySelector('.menuButtons');
    $menuInfo = document.querySelector('.menuInfo');
    createButtons();
}

const prepareDOMEvents = () => {
    $buttons.forEach(button => {
        button.addEventListener('click', checkClick);
    });
}

// Additional

const createButtons = () => {
    $foods.forEach((food, index) => {
        const btn = document.createElement('button');
        btn.setAttribute('id', `${index}`);
        btn.innerHTML = `<i class="fas fa-utensils"></i><span>${index + 1}</span>`;
        $buttons.push(btn);
        $buttonsDiv.appendChild(btn);
    })
}

const checkClick = (e) => {
    console.log(e.target.closest('button').id);
    $menuInfo.innerText = $foods[e.target.closest('button').id].showInfo();
}

// MAIN event
document.addEventListener('DOMContentLoaded', main);