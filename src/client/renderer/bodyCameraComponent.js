class BodyCameraComponent {
    constructor(bodyComponent) {
        this.bodyComponent = bodyComponent;
        this.cameraPosition = this.bodyComponent.position.copy();
    }

    negateAndMove(newPosition) {
        this.cameraPosition = this.cameraPosition.neg().add(newPosition);
        return this;
    }

    update() {
        this.cameraPosition = this.bodyComponent.position.copy();
        return this;
    }
    
}

module.exports = BodyCameraComponent;