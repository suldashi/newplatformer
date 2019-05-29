const PlayerInputComponent = require("./playerInputComponent");

class InputFactory {
    constructor() {
        this.components = [];    
    }

    createPlayerInputComponent(playerComponent) {
        let playerInputComponent = new PlayerInputComponent(playerComponent);
        this.components.push(playerInputComponent);
        return playerInputComponent;
    }

    update(delta) {
        for(var i in this.components) {
            this.components[i].update(delta);
        }
    }
}

module.exports = InputFactory;