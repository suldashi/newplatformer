const uuid = require("uuid");

class EventBus {
    constructor() {
        this.eventHandlers = [];
    }
    
    emit(eventName,eventData) {
        for(var i in this.eventHandlers[eventName]) {
            this.eventHandlers[eventName][i](eventData);
        }
    }

    on(eventName,callback) {
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(callback);
    }
}

let eventBus = new EventBus();
window.eventBus = eventBus;

module.exports = eventBus;