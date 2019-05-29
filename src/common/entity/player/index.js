const eventBus = require("../../event");
const IdleState = require("./playerState").IdleState;
const switchToIdleState = require("./playerState").switchToIdleState;
const switchToFiringState = require("./playerState").switchToFiringState;

class PlayerComponent {

    constructor() {
        this.playerState = new IdleState(this);
        eventBus.on("newPlayerControls",(inputs) => {
            this.handleInputs(inputs);
        });
    }

    get angle() {
        return this.playerState.angle; 
    }

    handleInputs(inputs) {
        if(inputs.up) {
            this.setRunning();
            eventBus.emit("playerMove");
        }
        else {
            this.setIdle();
            eventBus.emit("playerStop");
        }
        if(this.angle !== inputs.angle) {
            this.playerState.angle = inputs.angle;
            eventBus.emit("playerAngle", this.angle);
        }
    }

    setRunning() {
        switchToFiringState(this);
    }

    setIdle() {
        switchToIdleState(this);
    }

    setAngle(angle) {
        this.playerState.setAngle(angle);
    }

    update() {

    }

    
}

module.exports = PlayerComponent;