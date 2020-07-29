class Food {
    constructor(name, price) {
        this.name = name,
            this.price = price
    }

    showInfo() {
        return `${this.name} costs ${this.price}$`;
    }
}