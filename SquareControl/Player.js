class Player {
    constructor(name = 'PlayerExample', posX = 0, posY = 0, movSpeed = 100) {
        this.name = name;
        this.health = 100;
        this.positionX = posX;
        this.positionY = posY;
        this.movementSpeed = movSpeed;
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        //TODO Validation
        this.name = newName;
    }

    getHealth() {
        return this.health;
    }

    getPosition() {
        return [this.positionX, this.positionY];
    }

    move(keyCode) {
        let borders;

        switch (keyCode) {
            case 37:
                if (this.positionX - this.movementSpeed < 0)
                    borders = keyCode;
                else {
                    this.positionX -= this.movementSpeed;
                    borders = 0;
                }
                break;
            case 38:
                if (this.positionY - this.movementSpeed < 0)
                    borders = keyCode;
                else {
                    this.positionY -= this.movementSpeed;
                    borders = 0;
                }
                break;
            case 39:
                if (this.positionX + this.movementSpeed >= 600)
                    borders = keyCode;
                else {
                    this.positionX += this.movementSpeed;
                    borders = 0;
                }
                break;
            case 40:
                if (this.positionY + this.movementSpeed > 300)
                    borders = keyCode;
                else {
                    this.positionY += this.movementSpeed;
                    borders = 0;
                }
                break;
        }

        return borders;
    }
}