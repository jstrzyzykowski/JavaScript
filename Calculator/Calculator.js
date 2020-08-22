class Calculator {
    constructor() {
        // DOM Elements
        this.clock = document.querySelector('div.clock p');
        this.themeSlider = document.querySelector('div.theme-slider');
        this.result = document.querySelector('div.result p');
        this.equation = document.querySelector('div.equation p');

        // Calculator data
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
                this.operationType = "";

                this.resultContext = "0";
                this.equationContext = "0";
                this.numbers = [];
                this.waitingForSecondNumber = false;
                this.secondNumber = null;
                break
            case 'one':
                if (this.resultContext === "0" || this.waitingForSecondNumber) {
                    this.resultContext = "1";
                    this.waitingForSecondNumber = false;
                }
                else this.resultContext += "1";
                break;
            case 'one':
                this.display(1);
                break;
            case 'two':
                this.display(2);
                break;
            case 'three':
                this.display(3);
                break;
            case 'four':
                this.display(4);
                break;
            case 'five':
                this.display(5);
                break;
            case 'six':
                this.display(6);
                break;
            case 'seven':
                this.display(7);
                break;
            case 'eight':
                this.display(8);
                break;
            case 'nine':
                this.display(9);
                break;
            case 'zero':
                this.display(0);
                break;
            case 'multiply':
                this.numbers.push(parseFloat(this.resultContext));
                this.operationType = 'multiply';
                this.equationContext = `${this.numbers[0]} x `;
                this.waitingForSecondNumber = true;
                break;
            case 'subtraction':
                this.numbers.push(parseFloat(this.resultContext));
                this.operationType = 'subtraction';
                this.equationContext = `${this.numbers[0]} - `;
                this.waitingForSecondNumber = true;
                break;
            case 'result':
                let result;

                this.numbers.push(parseFloat(this.resultContext));
                switch (this.operationType) {
                    case 'multiply':
                        if (this.numbers.length === 1) {
                            this.numbers.push(this.secondNumber);
                        }

                        result = this.numbers[0] * this.numbers[1];
                        this.secondNumber = this.numbers[1];
                        this.resultContext = result;
                        this.equationContext = `${this.numbers[0]} x ${this.numbers[1]} =`;
                        this.numbers = [];
                        break;
                    case 'subtraction':
                        if (this.numbers.length === 1) {
                            this.numbers.push(this.secondNumber);
                        }

                        result = this.numbers[0] - this.numbers[1];
                        this.secondNumber = this.numbers[1];
                        this.resultContext = result;
                        this.equationContext = `${this.numbers[0]} - ${this.numbers[1]} =`;
                        this.numbers = [];
                        break;
                }
                break
        }

        this.render();
    }

    display(value) {
        if (this.resultContext === "0" || this.waitingForSecondNumber) {
            this.resultContext = `${value}`;
            this.waitingForSecondNumber = false;
        }
        else this.resultContext += `${value}`;
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