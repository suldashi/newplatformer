const Vec2 = require("./vec2");
const PolygonBodyComponent = require("./polygonBodyComponent");
const PointBodyComponent = require("./pointBodyComponent");
const PolygonRotationComponent = require("./polygonRotationComponent");
const ColliderComponent = require("./colliderComponent");
const checkCollision = require("./satCollisionChecker");

class Physics {

    constructor() {
        this.bodies = [];
        this.collidingBodies = [];
        this.colliders = [];
        this.colliderCallbacks = {};
    }

    createBodyComponent(x,y,width,height) {
        let hw = width/2;
        let hh = height/2;
        let body = new PolygonBodyComponent([new Vec2(x-hw,y-hh),new Vec2(x+hw,y-hh),new Vec2(x+hw,y+hh),new Vec2(x-hw,y+hh)]);
        this.bodies.push(body);
        return body;
    }

    createPointBodyComponent(x,y) {
        let body = new PointBodyComponent(x,y);
        this.bodies.push(body);
        return body;
    }

    createSlopedFloorComponent(x,y,width,height) {
        let hw = width/2;
        let hh = height/2;
        let body = new PolygonBodyComponent([new Vec2(x-hw,y-hh),new Vec2(x+hw,y-3*hh),new Vec2(x+hw,y-hh),new Vec2(x-hw,y+hh)]);
        this.bodies.push(body);
        return body;
    }

    createPolygonRotationComponent(polygonComponent) {
        let polygonRotationComponent = new PolygonRotationComponent(polygonComponent);
        this.bodies.push(polygonRotationComponent);
        return polygonRotationComponent;
    }

    createColliderComponent(bodyComponent,colliderTag) {
        let colliderComponent = new ColliderComponent(bodyComponent,colliderTag);
        this.colliders.push(colliderComponent);
        return colliderComponent;
    }

    registerCollider(firstTag,secondTag,onCollisionCallback) {
        this.colliderCallbacks[this.getTagIndex(firstTag,secondTag)] = onCollisionCallback;
    }

    getTagIndex(firstTag,secondTag) {
        if(firstTag>secondTag) {
            return `${firstTag}|${secondTag}`;
        }
        else {
            return `${secondTag}|${firstTag}`;
        }
    }

    checkColliders() {
        for(let i=0;i<this.colliders.length-1;i++) {
            for(let j=i+1;j<this.colliders.length;j++) {
                let firstTag = this.colliders[i].colliderTag;
                let secondTag = this.colliders[j].colliderTag;
                let colliderTag = this.getTagIndex(firstTag,secondTag);
                if(this.colliderCallbacks[colliderTag]) {
                    let collision = checkCollision(this.colliders[i].bodyComponent,this.colliders[j].bodyComponent);
                    if(collision) {
                        this.colliderCallbacks[colliderTag](this.colliders[i],this.colliders[j],collision);
                    }
                }
            }
        }
    }

    update(delta) {
        for(var i in this.bodies) {
            this.bodies[i].update(delta);
        }
        this.checkColliders();
    }
}

module.exports = Physics;