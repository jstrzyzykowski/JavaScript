class KebabMachine {
    #kebab = {
        roll: false,
        stuff: []
    }

    #makeRoll() {
        this.#kebab.roll = true;
    }

    #makeStuff(stuff) {
        this.#kebab.stuff = stuff.map(el => el.toLowerCase());
    }

    createKebab(...components) {
        this.#makeRoll();
        this.#makeStuff(components);

        return this.#kebab;
    }
}

const machine = new KebabMachine();
machine.createKebab('mało mięsa', 'dużo kapusty');
console.log(machine);

// machine.#kebab = 100;
// machine.makeStuff();

// if(confirm("Czy chcesz wyszyścić zapisane dane?")) {
//     console.log("Local storage cleared");
// }