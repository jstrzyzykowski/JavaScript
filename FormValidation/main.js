const nickInput = document.getElementById('nickname');
const passInput = document.getElementById('password');
const form = document.getElementById('login');
const nickMsgDiv = document.querySelector('.nick-msg');
const passMsgDiv = document.querySelector('.pass-msg');

let isNickEmpty = true;
let isNickLongEnough = false;
let isPassEmpty = true;
let isPassLongEnough = false;


nickInput.addEventListener('input', (e) => {
    const minNickLong = 4;
    const nickSigns = [...e.target.value];

    if (e.value === "" || e.value === null) isNickEmpty = true;
    else isNickEmpty = false;

    if (nickSigns.length < minNickLong) isNickLongEnough = false;
    else isNickLongEnough = true;
});

passInput.addEventListener('input', (e) => {
    const minPassLong = 8;
    const passSigns = [...e.target.value];

    if (e.value === "" || e.value === null) isPassEmpty = true;
    else isPassEmpty = false;

    if (passSigns.length < minPassLong) isPassLongEnough = false;
    else isPassLongEnough = true;
});


form.addEventListener('submit', (e) => {
    let nickMessages = [];
    let passMessages = [];

    if (isNickEmpty) nickMessages.push('Nick empty');
    if (!isNickLongEnough) nickMessages.push('Nick too short');

    if (isPassEmpty) passMessages.push('Pass empty');
    if (!isPassLongEnough) passMessages.push('Pass too short');

    nickMsgDiv.textContent = nickMessages.join(', ');
    passMsgDiv.textContent = passMessages.join(', ');

    if (nickMessages.length != 0 || passMessages != 0) e.preventDefault();
});