const Vec2 = require("./vec2");

class PolygonBodyComponent {
    constructor(points,gravityEnabled = false) {
        console.log(gravityEnabled);
        this.points = points;
        let sumX = 0;
        let sumY = 0;
        for(var i in points) {
            sumX+=points[i].x;
            sumY+=points[i].y;
        }
        this.center = new Vec2(sumX/this.points.length,sumY/this.points.length);
        this.velocity = new Vec2(0,0);
        this.acceleration = new Vec2(0,gravityEnabled?1000:0);
        this.height = 0;
    }

    setVelocity(velocity) {
        this.velocity = velocity.copy();
    }

    setXVelocity(newValue) {
        this.velocity = new Vec2(newValue,this.velocity.y);
    }

    setYVelocity(newValue) {
        this.velocity = new Vec2(this.velocity.x,newValue);
    }

    get position() {
        return this.center.copy();
    }

    update(delta) {
        this.velocity = this.velocity.add(this.acceleration.scale(delta));
        let dv = this.velocity.scale(delta);
        for(var i in this.points) {
            this.points[i].addToThis(dv);
        }
        this.center.addToThis(dv);
    }
}

module.exports = PolygonBodyComponent;