// Containers for DOM Elements
let $timerSpan;
let $promoSection;
let $header;
let $outerBox;

// Container for variables
let $promoTimer;


const prepareDOMElements = () => {
    $timerSpan = document.querySelector('.promo .timer');
    $promoSection = document.querySelector('section.promo');
    $header = document.querySelector('header');
    $outerBox = document.querySelector('.outer-box');
}

const prepareDOMEvents = () => {
    $promoTimer = setInterval(updatePromoTimer, 1000);
    window.addEventListener('scroll', () => {
        if (this.scrollY > 30) {
            $outerBox.style.top = '-40px';
        } else {
            $outerBox.style.top = '';
        }
    });
}

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const updatePromoTimer = () => {
    let finalTimeString = "";
    const nowTime = new Date().getTime();
    const endTime = new Date('2020-08-12 11:00:00').getTime();
    // const time = $endTime - nowTime;

    let days = Math.floor(endTime / (1000 * 60 * 60 * 24) - (nowTime / (1000 * 60 * 60 * 24)));
    days = days < 10 ? `0${days}` : days;
    finalTimeString += `${days} Days`;

    let hours = Math.floor((endTime / (1000 * 60 * 60) - nowTime / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? `0${hours}` : hours;
    finalTimeString += ` ${hours} Hrs.`;

    let minutes = Math.floor((endTime / (1000 * 60) - nowTime / (1000 * 60)) % 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    finalTimeString += ` ${minutes} Mins.`;

    let seconds = Math.floor((endTime / 1000 - nowTime / 1000) % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    finalTimeString += ` ${seconds} Secs.`;

    $timerSpan.innerText = finalTimeString;
}


document.addEventListener('DOMContentLoaded', main);