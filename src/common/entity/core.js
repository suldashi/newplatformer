const GameObject = require("./gameObject");
const eventBus = require("../event");

class EngineCore {
    constructor(physics,renderer,schedulerFactory,entityFactory,inputFactory) {
        this.physics = physics;
        this.renderer = renderer;
        this.schedulerFactory = schedulerFactory;
        this.entityFactory = entityFactory;
        this.inputFactory = inputFactory;
        this.gameObjects = [];
        this.physics.registerCollider("player","wall",(firstCollider,secondCollider,collisionVector) => {
            if(firstCollider.colliderTag === "player") {
                let reverseCollisionVector = collisionVector.scale(-1);
                firstCollider.bodyComponent.points = firstCollider.bodyComponent.points.map(x => x.add(reverseCollisionVector));
                firstCollider.bodyComponent.center = firstCollider.bodyComponent.center.add(reverseCollisionVector);
            }
            else {
                secondCollider.bodyComponent.points = secondCollider.bodyComponent.points.map(x => x.add(collisionVector));
                secondCollider.bodyComponent.center = secondCollider.bodyComponent.center.add(collisionVector);
            }
        });
    }

    createCornerText() {
        let textObject = new GameObject();
        let textComponent = this.renderer.createTextComponent();
        textObject.attachComponent(textComponent);
        this.gameObjects.push(textObject);
    }

    createStatic(x,y,w,h) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createBodyComponent(x,y,w,h);
        let renderComponent = this.renderer.createPolygonRenderComponent(bodyComponent);
        let polygonRotationComponent = this.physics.createPolygonRotationComponent(bodyComponent);
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        staticObject.attachComponent(polygonRotationComponent);
        this.gameObjects.push(staticObject);
    }

    createFloor(x,y) {
        let staticObject = new GameObject();
        let bodyComponent = this.physics.createBodyComponent(x,y,64,64);
        let renderComponent = this.renderer.createPolygonRenderComponent(bodyComponent);
        let colliderComponent = this.physics.createColliderComponent(bodyComponent,"wall");
        staticObject.attachComponent(bodyComponent);
        staticObject.attachComponent(renderComponent);
        staticObject.attachComponent(colliderComponent);
        this.gameObjects.push(staticObject);
    }

    createPlayer(x,y) {
        let player = new GameObject();
        let w = 20;
        let h = 20;
        let bodyComponent = this.physics.createBodyComponent(x,y,w,h,true);
        let playerBodyComponent = this.entityFactory.createPlayerBodyComponent(bodyComponent);
        let cameraComponent = this.renderer.createCameraComponent(bodyComponent);
        let playerComponent = this.entityFactory.createPlayerComponent();
        let playerInputComponent = this.inputFactory.createPlayerInputComponent();
        let renderComponent = this.renderer.createPlayerRenderComponent(bodyComponent,playerComponent);
        let colliderComponent = this.physics.createColliderComponent(bodyComponent,"player");
        this.renderer.setActiveCamera(cameraComponent);
        player.attachComponent(playerBodyComponent);
        player.attachComponent(playerComponent);
        player.attachComponent(cameraComponent);
        player.attachComponent(renderComponent);
        player.attachComponent(playerInputComponent);
        player.attachComponent(colliderComponent);
        this.gameObjects.push(player);
    }

    createStaticTriangle(x,y,h) {
        let triangle = new GameObject();
        let bodyComponent = this.physics.createTriangleComponent(x,y,h);
        let renderComponent = this.renderer.createPolygonRenderComponent(bodyComponent);
        let polygonRotationComponent = this.physics.createPolygonRotationComponent(bodyComponent);
        triangle.attachComponent(bodyComponent);
        triangle.attachComponent(renderComponent);
        triangle.attachComponent(polygonRotationComponent);
        this.gameObjects.push(triangle);
    }

    createScheduler() {
        let scheduler = this.schedulerFactory.createScheduler();
        return scheduler;
    }

    update(delta) {
        this.schedulerFactory.update(delta*1000);
        this.inputFactory.update(delta);
        this.physics.update(delta);
        this.entityFactory.update(delta);
    }
}

module.exports = EngineCore;