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
        if(inputs.left && !inputs.right) {
            this.setRunning();
            eventBus.emit("playerMoveLeft");
        }
        else if(!inputs.left && inputs.right) {
            this.setRunning();
            eventBus.emit("playerMoveRight");
        }
        else if(!inputs.left && !inputs.right) {
            this.setIdle();
            eventBus.emit("playerStop");
        }
        if(inputs.up && !inputs.down) {
            eventBus.emit("playerJump");
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