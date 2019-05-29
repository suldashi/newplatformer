const eventBus = require("../../common/event");

class KeyboardInputProvider{
    constructor() {
        this.canvasElement = document.querySelector("#root canvas");
        this.canvasWidth = this.canvasElement.clientWidth;
        this.canvasHeight = this.canvasElement.clientHeight;
        this.canvasElement.onmousemove = (ev) => {
            let centerX = this.canvasWidth/2;
            let centerY = this.canvasHeight/2;
            eventBus.emit("newAngle",Math.atan2(ev.clientY-centerY,ev.clientX-centerX));
        }
        window.onkeydown = (event) => {
            switch(event.code) {
                case "KeyW": {
                    eventBus.emit("newInputUp",true);
                    break;
                }
                case "KeyS": {
                    eventBus.emit("newInputDown",true);
                    break;
                }
                case "KeyA": {
                    eventBus.emit("newInputLeft",true);
                    break;
                }
                case "KeyD": {
                    eventBus.emit("newInputRight",true);
                    break;
                }
            }
        };
        window.onkeyup = (event) => {
            switch(event.code) {
                case "KeyW": {
                    eventBus.emit("newInputUp",false);
                    break;
                }
                case "KeyS": {
                    eventBus.emit("newInputDown",false);
                    break;
                }
                case "KeyA": {
                    eventBus.emit("newInputLeft",false);
                    break;
                }
                case "KeyD": {
                    eventBus.emit("newInputRight",false);
                    break;
                }
            }
        };
    }
}

module.exports = KeyboardInputProvider;