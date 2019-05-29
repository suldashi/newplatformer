const PlayerComponent = require("./player");
const PlayerBodyComponent = require("./player/playerBodyComponent");

class EntityFactory {
    constructor() {
        this.components = [];    
    }

    createPlayerComponent(inputComponent) {
        let playerComponent = new PlayerComponent(inputComponent);
        this.components.push(playerComponent);
        return playerComponent;
    }

    createPlayerBodyComponent(bodyComponent) {
        let playerBodyComponent = new PlayerBodyComponent(bodyComponent);
        this.components.push(playerBodyComponent);
        return playerBodyComponent;
    }

    update(delta) {
        for(var i in this.components) {
            this.components[i].update(delta);
        }
    }
}

module.exports = EntityFactory;