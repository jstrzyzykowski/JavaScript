let elements = [];
const addBtn = document.querySelector('button');
const removeBtn = document.querySelector('button+button');
const section = document.querySelector('section');

render = () => {
    section.textContent = "";
    elements.forEach(element => {
        section.appendChild(element);
    });
}

removeElement = () => {
    if (elements.length !== 0) {
        elements = [];
        render();
    }
}

addElement = () => {
    const div = document.createElement('div');
    div.textContent = elements.length + 1;
    if ((elements.length + 1) % 5 === 0) {
        div.className = "circle";
        div.style.animation = `circleStep 1s ${elements.length * 0.1}s linear infinite`;
    } else {
        div.className = "square";
        div.style.animation = `squareStep 1s ${elements.length * 0.1}s linear infinite`;
    }
    elements.push(div);
    render();
}

addBtn.addEventListener('click', addElement);
removeBtn.addEventListener('click', removeElement);