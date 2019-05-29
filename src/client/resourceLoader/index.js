let resourceList = require("./resources");
let config = require("../../common/config");
const PIXI = require("../renderer/pixi");

class ResourceLoader {
    constructor() {
        this.resources = {
            animations:{},
            sheets:{},
            images:{}
        };
    }

    loadImage(url) {
        return new Promise((resolve,reject) => {
            let img = new Image();
            img.onload = () => {
                resolve(img);
            }
            img.src = url;
        });
    }

    addSheet(sheetName,sheetResource) {
        return new Promise(async (resolve,reject) => {
            let jsonData = await fetch(`${config.spriteRoot}/${sheetResource.data}`).then(response => response.json());
            let img = await this.loadImage(`${config.spriteRoot}/${sheetResource.url}`);
            this.resources.sheets[sheetName] = {
                img,
                data:jsonData,
                sheet: new PIXI.Spritesheet(new PIXI.BaseTexture(img), jsonData),
            };
            this.resources.sheets[sheetName].sheet.parse(() => {
                resolve(this.resources.sheets[sheetName]);
            });
        });
    }

    addImage(imageName,imageResource) {
        let baseName = imageResource.baseName;
        let sheet = this.resources.sheets[baseName];
        this.resources.images[imageName] = {
            baseName,
            offsetX:imageResource.offsetX?imageResource.offsetX:0,
            offsetY:imageResource.offsetY?imageResource.offsetY:0,
            texture: sheet.sheet.textures[`${imageName}.png`]
        };
    }
    
    getResources() {
        return this.resources;
    }

    async loadAllResources() {
        await this.loadAllSheets();
        this.loadAllImages();
        this.loadAllAnimations();
        return this.getResources();
    }

    loadAllAnimations() {
        for(var i in resourceList.animations) {
            let anim = this.resources.animations[resourceList.animations[i].name] = resourceList.animations[i];
            anim.offsetX = resourceList.animations[i].offsetX?resourceList.animations[i].offsetX:0;
            anim.offsetY = resourceList.animations[i].offsetY?resourceList.animations[i].offsetY:0;
        }
    }

    loadAllSheets() {
        return Promise.all(Object.keys(resourceList.sheets).map(el => this.addSheet(el,resourceList.sheets[el])));
    }

    loadAllImages() {
        return Promise.all(Object.keys(resourceList.images).map(el => this.addImage(el,resourceList.images[el]))); 
    }

}

module.exports = ResourceLoader;