const Vec2 = require("./vec2");

class PolygonBodyComponent {
    constructor(x,y) {
        this.position = new Vec2(x,y);
        this.velocity = new Vec2(0,0);
        this.height = 0;
    }

    setVelocity(velocity) {
        this.velocity = velocity.copy();
    }

    update(delta) {
        let dv = this.velocity.scale(delta);
        this.position.addToThis(dv);
    }
}

module.exports = PolygonBodyComponent;