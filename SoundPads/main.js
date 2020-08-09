const pads = [...document.querySelectorAll('.pad')];

const check = (e) => {
    const padKey = e.target.closest('.pad').dataset.key;
    const pad = pads[padKey];

    pad.addEventListener('animationend', () => {
        pad.classList.remove('pad-active');
        pad.style.animation = '';
    });

    if (!pad.classList.contains('pad-active')) {
        pad.classList.add('pad-active');
        pad.style.animation = 'push 2s ease 1 forwards';
    }


    // Wyłączyć animację z PAD -> animation none animation ''
}


pads.forEach(pad => pad.addEventListener('click', check));