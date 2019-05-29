const eventBus = require("../../event");
const Vec2 = require("../../physics/vec2");

class PlayerBodyComponent {
    constructor(bodyComponent) {
        this.bodyComponent = bodyComponent;
        this.baseSpeed = 160;
        this.speed = 0;
        this.angle = 0;
        eventBus.on("playerMoveRight",moveObj => {
            this.bodyComponent.setXVelocity(this.baseSpeed);
        });
        eventBus.on("playerMoveLeft",moveObj => {
            this.bodyComponent.setXVelocity(-this.baseSpeed);
        });
        eventBus.on("playerJump",() => {
            this.bodyComponent.setYVelocity(-this.baseSpeed);
        });
        eventBus.on("playerAngle",newAngle => {
            this.angle = newAngle;
        })
        eventBus.on("playerStop",() => {
            this.bodyComponent.setXVelocity(0);
        });
    }

    update() { 
        eventBus.emit("playerPosition",{
            position:this.bodyComponent.position.copy(),
            angle: this.angle
        });
    }
}

module.exports = PlayerBodyComponent;