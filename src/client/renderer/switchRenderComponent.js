const RenderComponent = require("./renderComponent");
const PIXI = require("./pixi");

class SwitchRenderComponent extends RenderComponent {
    constructor(bodyComponent,switchComponent,resources,stage) {
        super();
        this.switchComponent = switchComponent;
        this.bodyComponent = bodyComponent
        this.resources = resources;
        this.stage = stage;
        this.scale = 1;
        this.spriteName = switchComponent.spriteName;
        this.offsetX = 0;
        this.offsetY = 0;
        this.displaySprite(this.spriteName);
        
    }

    get zIndex() {
        return -100000000;
    }

    update(camera) {
        if(this.spriteName !== this.switchComponent.spriteName) {
            this.spriteName = this.switchComponent.spriteName;
            this.destroyAnimation();
            this.displaySprite(this.spriteName);
        }
        this.sprite.zIndex = this.zIndex;
        this.sprite.x = this.bodyComponent.position.x+camera.cameraPosition.x + this.offsetX;
        this.sprite.y = this.bodyComponent.position.y+camera.cameraPosition.y + this.offsetY;
    }

    playAnimation(animationTextures,animationSpeed) {
        this.sheet = this.resources.sheets[this.baseName];
        this.animation = animationTextures;
        this.sprite = new PIXI.AnimatedSprite(this.animation);
        this.sprite.anchor = new PIXI.ObservablePoint(null,null,0.5,0.5);
        this.sprite.scale.x = this.sprite.scale.y = this.scale;
        this.sprite.animationSpeed = animationSpeed;
        this.sprite.play();
        
        this.stage.pixiStage.addChild(this.sprite);
    }

    destroyAnimation() {
        this.sprite.destroy();
    }

    displaySprite(spriteName) {
        this.baseName = this.getSheetBaseName(spriteName);
        this.sheet = this.resources.sheets[this.baseName];
        let isAnimation = typeof this.resources.animations[spriteName] !== "undefined";
        if(isAnimation) {
            this.offsetX = this.resources.animations[spriteName].offsetX;
            this.offsetY = this.resources.animations[spriteName].offsetY;
            this.playAnimation(this.sheet.sheet.animations[spriteName],this.resources.animations[spriteName].speed);
        }   
        else {
            this.offsetX = this.resources.images[spriteName].offsetX;
            this.offsetY = this.resources.images[spriteName].offsetY;
            this.playAnimation([this.resources.images[spriteName].texture],1);
        }
    }

    getSheetBaseName(spriteName) {
        return this.resources.animations[spriteName]?this.resources.animations[spriteName].baseName:this.resources.images[spriteName].baseName;
    }
}

module.exports = SwitchRenderComponent;