//TODO: update to use eventBus

const InputComponent = require("../../common/input");

class JoyconComponent extends InputComponent {
    constructor() {
        super();
        this.analogAxes = {
            up:-1,
            upRight: -0.7142857313156128,
            right: -0.4285714030265808,
            downRight:-0.1428571343421936,
            down:0.14285719394683838,
            downLeft:0.4285714626312256,
            left:0.7142857313156128,
            upLeft:1
        }
    }

    getInputs() {
        var gp = navigator.getGamepads();
        let joyCon = null;
        if(gp[0]!==null){
            joyCon = gp[0];
        }
        else if(gp[1]!==null){
            joyCon = gp[1];
        }
        else if(gp[2]!==null){
            joyCon = gp[2];
        }
        else if(gp[3]!==null){
            joyCon = gp[3];
        }
        let button = joyCon?joyCon.buttons[2].pressed:false;
        let analogValue = joyCon?joyCon.axes[9]:2;
        switch(analogValue) {
            case this.analogAxes.up:
                return {up:true,left:false,down:false,right:false,jump:button}
            case this.analogAxes.upRight:
                return {up:true,left:false,down:false,right:true,jump:button}
            case this.analogAxes.right:
                return {up:false,left:false,down:false,right:true,jump:button}
            case this.analogAxes.downRight:
                return {up:false,left:false,down:true,right:true,jump:button}
            case this.analogAxes.down:
                return {up:false,left:false,down:true,right:false,jump:button}
            case this.analogAxes.downLeft:
                return {up:false,left:true,down:true,right:false,jump:button}
            case this.analogAxes.left:
                return {up:false,left:true,down:false,right:false,jump:button}
            case this.analogAxes.upLeft:
                return {up:true,left:true,down:false,right:false,jump:button}
            default: 
                return {up:false,left:false,down:false,right:false,jump:button}
        }
    }
}

module.exports = JoyconComponent;