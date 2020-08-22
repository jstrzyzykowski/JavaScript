class Calculator {
    constructor() {
        // DOM Elements
        this.clock = document.querySelector('div.clock p');
        this.themeSlider = document.querySelector('div.theme-slider');
        this.result = document.querySelector('div.result p');
        this.equation = document.querySelector('div.equation p');

        // Calculator Data
        this.operationType = "";

        this.resultContext = "0";
        this.equationContext = "0";
        this.numbers = [];
        this.waitingForSecondNumber = false;
        this.secondNumber = null;


        document.querySelectorAll('div.button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleClick(e.target.dataset.function);
            });
        });

        setInterval(this.updateClock.bind(this), 1000);

        this.render();
    }

    handleClick(dataFunction) {
        switch (dataFunction) {
            case 'reset':
                this.doReset();
                break
            case 'one':
                this.displayNumber(1);
                break;
            case 'two':
                this.displayNumber(2);
                break;
            case 'three':
                this.displayNumber(3);
                break;
            case 'four':
                this.displayNumber(4);
                break;
            case 'five':
                this.displayNumber(5);
                break;
            case 'six':
                this.displayNumber(6);
                break;
            case 'seven':
                this.displayNumber(7);
                break;
            case 'eight':
                this.displayNumber(8);
                break;
            case 'nine':
                this.displayNumber(9);
                break;
            case 'zero':
                this.displayNumber(0);
                break;
            case 'divide':
                this.doOperation('divide');
                break;
            case 'multiply':
                this.doOperation('multiply');
                break;
            case 'subtraction':
                this.doOperation('subtraction');
                break;
            case 'addition':
                this.doOperation('addition');
                break;
            case 'result':
                this.showResult();

                break
        }

        this.render();
    }

    displayNumber(number) {
        if (this.resultContext === "0" || this.waitingForSecondNumber) {
            this.resultContext = `${number}`;
            this.waitingForSecondNumber = false;
        }
        else this.resultContext += `${number}`;
    }

    doReset() {
        this.operationType = "";
        this.resultContext = "0";
        this.equationContext = "0";
        this.numbers = [];
        this.waitingForSecondNumber = false;
        this.secondNumber = null;
    }

    doOperation(type) {
        this.numbers.push(parseFloat(this.resultContext));
        this.operationType = type;
        switch (type) {
            case 'multiply':
                this.equationContext = `${this.numbers[0]} x `;
                break;
            case 'divide':
                this.equationContext = `${this.numbers[0]} / `;
                break;
            case 'addition':
                this.equationContext = `${this.numbers[0]} + `;
                break;
            case 'subtraction':
                this.equationContext = `${this.numbers[0]} - `;
                break;
        }
        this.waitingForSecondNumber = true;
    }

    showResult() {
        this.numbers.push(parseFloat(this.resultContext));
        if (this.numbers.length === 1) this.numbers.push(this.secondNumber);
        this.secondNumber = this.numbers[1];

        switch (this.operationType) {
            case 'divide':
                this.resultContext = this.numbers[0] / this.numbers[1];
                this.equationContext = `${this.numbers[0]} / ${this.numbers[1]} =`;
                break;
            case 'multiply':
                this.resultContext = this.numbers[0] * this.numbers[1];
                this.equationContext = `${this.numbers[0]} x ${this.numbers[1]} =`;
                break;
            case 'subtraction':
                this.resultContext = this.numbers[0] - this.numbers[1];
                this.equationContext = `${this.numbers[0]} - ${this.numbers[1]} =`;
                break;
            case 'addition':
                this.resultContext = this.numbers[0] + this.numbers[1];
                this.equationContext = `${this.numbers[0]} + ${this.numbers[1]} =`;
                break;
        }
        this.numbers = [];
    }

    updateClock() {
        const dateNow = new Date();
        let timeString = "";
        const h = dateNow.getHours();
        const m = dateNow.getMinutes();

        h < 10 ? timeString += `0${h}` : timeString += h;
        m < 10 ? timeString += `:0${m}` : timeString += `:${m}`;

        this.clock.innerText = timeString;
    }

    render() {
        this.result.innerText = this.resultContext;
        this.equation.innerText = this.equationContext;
    }

}