// Containers for DOM Elements
let $timerSpan;

// Container for variables
let $promoTimer;

const $endTime = new Date('2020-08-12 11:00:00').getTime();


const prepareDOMElements = () => {
    $timerSpan = document.querySelector('.promo .timer');
}

const prepareDOMEvents = () => {
    $promoTimer = setInterval(() => {
        let finalTimeString = "";
        const nowTime = new Date().getTime();
        const time = $endTime - nowTime;

        let days = Math.floor($endTime / (1000 * 60 * 60 * 24) - (nowTime / (1000 * 60 * 60 * 24)));
        days = days < 10 ? `0${days}` : days;
        finalTimeString += `${days} Days`;

        let hours = Math.floor(($endTime / (1000 * 60 * 60) - nowTime / (1000 * 60 * 60)) % 24);
        hours = hours < 10 ? `0${hours}` : hours;
        finalTimeString += ` ${hours} Hrs.`;

        let minutes = Math.floor(($endTime / (1000 * 60) - nowTime / (1000 * 60)) % 60);
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        finalTimeString += ` ${minutes} Mins.`;

        let seconds = Math.floor(($endTime / 1000 - nowTime / 1000) % 60);
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        finalTimeString += ` ${seconds} Secs.`;

        $timerSpan.innerText = finalTimeString;
    }, 1000);
}


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}


document.addEventListener('DOMContentLoaded', main);