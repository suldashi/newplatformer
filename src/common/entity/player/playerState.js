let playerStateData = {
    angle:0
}

class PlayerState {
    constructor(playerObject) {
        this.playerObject = playerObject;
        this.sprite = "idle";
    }

    switchState(newState) {
        this.playerObject.playerState = newState;
    }

    set angle(angle) {
        playerStateData.angle = angle;
    }


    get angle() {
        return playerStateData.angle;
    }
}

class IdleState extends PlayerState {
    constructor(playerObject) {
        super(playerObject);
    }
}

class FiringState extends PlayerState {
    constructor(playerObject) {
        super(playerObject);
        this.sprite = "firing";
    }
}

module.exports = {
    PlayerState,
    IdleState,
    switchToIdleState: (playerComponent) => {
        playerComponent.playerState.switchState(new IdleState(playerComponent));
    },
    switchToFiringState: (playerComponent) => {
        playerComponent.playerState.switchState(new FiringState(playerComponent));
    },
}