const RenderComponent = require("./renderComponent");
const PIXI = require("./pixi");
const event = require("../../common/event");

class TextComponent extends RenderComponent {
    constructor(stage) {
        super();
        this.stage = stage;
        this.zIndex = 100000000;
        this.angle = 0;
        this.spinningText = new PIXI.Text(this.angle, {fill: '#000', align: 'right'});
        this.spinningText.anchor.x=1;
        this.spinningText.anchor.y=1;
        this.spinningText.position.x = stage.width;
        this.spinningText.position.y = stage.height;
        this.stage.pixiStage.addChild(this.spinningText);
        event.on("playerPosition",(playerData) => {
            this.spinningText.text = playerData.position.x.toFixed(2) + "  " + playerData.position.y.toFixed(2);
        });
    }

    update() {
        
    }
}

module.exports = TextComponent;