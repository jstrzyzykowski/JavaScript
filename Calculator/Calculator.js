class Calculator {
    constructor() {
        this.display = new Display();
        this.processor = new Processor();

        this.clock = document.querySelector('div.clock p');
        this.themeSlider = document.querySelector('div.theme-slider');
        this.result = document.querySelector('div.result p');
        this.equation = document.querySelector('div.equation p');

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
            case 'one':
                this.writeNumber(1);
                break;
            case 'two':
                this.writeNumber(2);
                break;
            case 'three':
                this.writeNumber(3);
                break;
            case 'four':
                this.writeNumber(4);
                break;
            case 'five':
                this.writeNumber(5);
                break;
            case 'six':
                this.writeNumber(6);
                break;
            case 'seven':
                this.writeNumber(7);
                break;
            case 'eight':
                this.writeNumber(8);
                break;
            case 'nine':
                this.writeNumber(9);
                break;
            case 'zero':
                this.writeNumber(0);
                break;
            case 'reset':
                if (this.processor.resultString != "0" || this.processor.equationString != "0") {
                    this.processor.resultString = "0";
                    this.processor.equationString = "0";
                    this.display.resultCapacity = 10;
                    this.display.equationCapacity = 50;
                }
                break;
            case 'multiply':
                if (this.processor.resultString != "0" || this.processor.numbers.length) {
                    this.processor.numbers.push(parseFloat(this.processor.resultString));
                    if (this.processor.equationString != "0") this.processor.equationString += `${this.processor.resultString} x `;
                    else this.processor.equationString = `${this.processor.resultString} x `;

                    this.processor.operationChoosed = true;
                    this.processor.operationType = "multiply";
                }
                break;
            case 'result':
                console.log(this.processor.numbers.length);
                if (this.processor.numbers.length === 1) {
                    this.processor.numbers.push(parseFloat(this.processor.resultString));
                    console.log(this.processor.numbers)

                    if (this.processor.operationType != "") {
                        switch (this.processor.operationType) {
                            case 'multiply':
                                const numberOne = this.processor.numbers[0];
                                const numberTwo = this.processor.numbers[1];
                                const result = numberOne * numberTwo;

                                this.processor.resultString = `${result}`;
                                this.processor.equationString += `${numberTwo} = ${result}`;
                                this.processor.operationChoosed = false;
                                this.processor.operationType = "";
                                this.processor.numbers = [];

                                break
                        }
                    }
                }
                break
        }

        this.render();
    }

    writeNumber(value) {
        if (this.display.resultCapacity) {
            if (this.processor.resultString != "0") {
                if (!this.processor.operationChoosed) {
                    this.processor.resultString += `${value}`;
                    this.display.resultCapacity--;
                    console.log('halo1');
                } else {
                    this.processor.resultString = `${value}`;
                    this.display.resultCapacity = 10;
                    this.processor.operationChoosed = false;
                }
            } else {
                if (value) {
                    this.processor.resultString = `${value}`;
                    this.processor.operationChoosed = false;
                    console.log('operationChoosed = false');
                }
            }
            this.render();
        }
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
        this.result.innerText = this.processor.resultString;
        this.equation.innerText = this.processor.equationString;
    }

}