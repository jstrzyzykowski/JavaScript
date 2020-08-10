const pads = [...document.querySelectorAll('.pad')];
const sounds = document.querySelectorAll('.sound');

const check = (e) => {
    const padKey = e.target.closest('.pad').dataset.key;
    const pad = pads[padKey];

    if (!pad.classList.contains('pad-active')) {
        pad.classList.add('pad-active');
        pad.style.animation = 'push 2s ease 1 forwards';
        sounds[padKey].currentTime = 0;
        sounds[padKey].play();
    }

    pad.addEventListener('animationend', () => {
        pad.classList.remove('pad-active');
        pad.style.animation = '';
    });
}


pads.forEach(pad => pad.addEventListener('click', check));