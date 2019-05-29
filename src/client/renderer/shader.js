const PIXI = require("./pixi");

let shaderText = document.getElementById("shader").innerText;
let shader = new PIXI.Filter("",shaderText);
module.exports = shader;