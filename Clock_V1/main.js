const spnHValue = document.querySelector('.hours span.value');
const HDots = document.querySelectorAll('.hours .dots .dot');

const spnMValue = document.querySelector('.minutes span.value');
const MDots = document.querySelectorAll('.minutes .dots .dot');

const spnSValue = document.querySelector('.seconds span.value');
const SDots = document.querySelectorAll('.seconds .dots .dot');

function refreshDots(timePart, spnValue, dotsContainer) {
    timePart < 10 ? spnValue.textContent = `0${timePart}` : spnValue.textContent = timePart;
    for (let i = 0; i < timePart; i++) {
        dotsContainer[i].classList.add('active');
    }
    if (timePart === 0) dotsContainer.forEach(dot => dot.classList.remove('active'));
};

const clock = () => {
    const time = new Date();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();

    refreshDots(h, spnHValue, HDots);
    refreshDots(m, spnMValue, MDots);
    refreshDots(s, spnSValue, SDots);
}

setInterval(clock, 1000);