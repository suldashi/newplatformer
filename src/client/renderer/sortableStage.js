const PIXI = require("./pixi");

class SortableStage {
    constructor(options) {
        this.pixiStage = options.pixiStage;
        this.width = options.width;
        this.height = options.height;
        this.renderComponents = [];
        this.graphics = new PIXI.Graphics();
        this.pixiStage.addChild(this.graphics);
    }

    addRenderComponent(renderComponent) {
        this.renderComponents.push(renderComponent);
    }

    updateAll(activeCamera) {
        for(var i in this.renderComponents) {
            this.renderComponents[i].update(activeCamera);
        }
    }
}

module.exports = SortableStage;