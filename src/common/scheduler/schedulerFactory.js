const Scheduler = require("./scheduler");

class SchedulerFactory {
    constructor() {
        this.schedulers = [];
    }

    createScheduler() {
        let scheduler = new Scheduler();
        this.schedulers.push(scheduler);
        return scheduler;
    }

    update(deltaInMilliseconds) {
        for(var i in this.schedulers) {
            this.schedulers[i].update(deltaInMilliseconds);
        }
    }
}

module.exports = SchedulerFactory;