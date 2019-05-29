const eventBus = require("../../event");
const Vec2 = require("../../physics/vec2");

class PlayerBodyComponent {
    constructor(bodyComponent) {
        this.bodyComponent = bodyComponent;
        this.baseSpeed = 160;
        this.speed = 0;
        this.angle = 0;
        eventBus.on("playerMove",moveObj => {
            this.speed = this.baseSpeed;
        });
        eventBus.on("playerAngle",newAngle => {
            this.angle = newAngle;
        })
        eventBus.on("playerStop",() => {
            this.speed = 0;
        });
    }

    update() { 
        let velocity = new Vec2(this.speed,0).rotate(-this.angle);
        this.bodyComponent.setVelocity(velocity);
        eventBus.emit("playerPosition",{
            position:this.bodyComponent.position.copy(),
            angle: this.angle
        });
    }
}

module.exports = PlayerBodyComponent;