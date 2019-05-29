const RenderComponent = require("./renderComponent");

class PolygonRenderComponent extends RenderComponent {
    constructor(bodyComponent,graphics) {
        super();
        this.bodyComponent = bodyComponent;
        this.graphics = graphics;
        this.color = 0xFF0000;
        this.zIndex = 0;
    }
    

    update(camera) {
        this.graphics.beginFill(this.color);    //black
        let points = [];
        for(var i in this.bodyComponent.points) {
            points.push(this.bodyComponent.points[i].x + camera.cameraPosition.x,this.bodyComponent.points[i].y + camera.cameraPosition.y);
        }
        this.graphics.drawPolygon(points);
        this.graphics.endFill();
    }
}

module.exports = PolygonRenderComponent;