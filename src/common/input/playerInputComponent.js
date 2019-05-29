const eventBus = require("../event");

class PlayerInputComponent {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.angle = 0;
        this.updated = false;
        eventBus.on("newInputUp",this.updateUp.bind(this));
        eventBus.on("newInputDown",this.updateDown.bind(this));
        eventBus.on("newInputLeft",this.updateLeft.bind(this));
        eventBus.on("newInputRight",this.updateRight.bind(this));
        eventBus.on("newAngle",this.updateAngle.bind(this));
    }

    updateAngle(newAngle) {
        this.angle = newAngle;
        this.updated = true;
    }

    updateUp(newUp) {
        this.up = newUp;
        this.updated = true;
    }

    updateDown(newDown) {
        this.down = newDown;
        this.updated = true;
    }

    updateLeft(newLeft) {
        this.left = newLeft;
        this.updated = true;
    }

    updateRight(newRight) {
        this.right = newRight;
        this.updated = true;
    }

    getInputs() {
        let inputs = {
            up: this.up,
            down: this.down,
            left: this.left,
            right: this.right,
            angle: this.angle
        };
        return inputs;
    }

    update() { 
        if(this.updated) {
            eventBus.emit("newPlayerControls",this.getInputs());
            this.updated = false;
        }
    }
}

module.exports = PlayerInputComponent;