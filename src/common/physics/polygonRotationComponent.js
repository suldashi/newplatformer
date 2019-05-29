const Vec2 = require("./vec2");

class PolygonRotationComponent {
    constructor(polygonComponent) {
        this.polygonComponent = polygonComponent;
        this.angularVelocity = Math.PI;
    }

    update(delta) {
        this.centerPoint = this.polygonComponent.position;
        for(var i in this.polygonComponent.points) {
            this.polygonComponent.points[i] = this.polygonComponent.points[i].subtract(this.centerPoint).rotate(this.angularVelocity*delta).add(this.centerPoint);
        }
    }
}

module.exports = PolygonRotationComponent;