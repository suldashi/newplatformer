const PIXI = require("./pixi");
const SortableStage = require("./sortableStage");
const CameraComponent = require("./cameraComponent");
const BodyCameraComponent = require("./bodyCameraComponent");
const PolygonRenderComponent = require("./polygonRenderComponent");
const PlayerRenderComponent = require("./playerRenderComponent");
const StaticRenderComponent = require("./staticRenderComponent");
const SwitchRenderComponent = require("./switchRenderComponent");
const TextComponent = require("./textComponent");
const Vec2 = require("../../common/physics/vec2");
const config = require("../../common/config");

PIXI.utils.skipHello();
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

class PixiRenderer {
    constructor(resources) {
        this.parentElement = document.getElementById("root");
        this.width = config.hres;
        this.height = config.vres;
        this.app = new PIXI.Application({width: this.width, height: this.height});
        this.app.renderer.backgroundColor = 0xffffff;
        this.app.stage.sortableChildren = true;
        this.sortableStage = new SortableStage({
            pixiStage:this.app.stage,
            width:this.width,
            height:this.height,
        });
        this.activeCamera = new CameraComponent(0,0);
        this.screenCenter = new Vec2(this.width/2,this.height/2);
        this.renderComponents = [];
        this.parentElement.appendChild(this.app.view);
        this.resources = resources;
        this.graphics = this.sortableStage.graphics;
    }

    createPolygonRenderComponent(bodyComponent) {
        let renderComponent = new PolygonRenderComponent(bodyComponent,this.graphics);
        this.sortableStage.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createStaticRenderComponent(bodyComponent,textureName,height) {
        let renderComponent = new StaticRenderComponent(bodyComponent,this.resources,this.sortableStage,textureName,height);
        this.sortableStage.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createSwitchRenderComponent(bodyComponent,switchComponent) {
        let renderComponent = new SwitchRenderComponent(bodyComponent,switchComponent,this.resources,this.sortableStage);
        this.sortableStage.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createPlayerRenderComponent(bodyComponent,playerComponent) {
        let renderComponent = new PlayerRenderComponent(bodyComponent,playerComponent,this.resources,this.sortableStage);
        this.sortableStage.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createTextComponent() {
        let renderComponent = new TextComponent(this.sortableStage);
        this.sortableStage.addRenderComponent(renderComponent);
        return renderComponent;
    }

    createCameraComponent(bodyComponent) {
        return new BodyCameraComponent(bodyComponent);
    }

    setActiveCamera(cameraComponent) {
        this.activeCamera = cameraComponent;
    }

    drawFrame() {
        requestAnimationFrame(() => {
            this.graphics.clear();
            this.activeCamera.update().negateAndMove(this.screenCenter);
            this.sortableStage.updateAll(this.activeCamera);
        });   
    }
}

module.exports = PixiRenderer;