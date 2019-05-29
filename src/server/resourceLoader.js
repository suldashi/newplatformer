class ResourceLoader {
    constructor() {
        this.resources = {
            images:{},
            animations:{}
        };
    }
    
    getResources() {
        return this.resources;
    }

    loadAllResources() {
        return Promise.resolve(this.getResources());
    }

}

module.exports = ResourceLoader;