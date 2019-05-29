const MainLoop = require("mainloop.js");
const Physics = require("../common/physics");
const EngineCore = require("../common/entity/core");
const SchedulerFactory = require("../common/entity/scheduler/schedulerFactory");
const MockInputComponent = require("../common/input");

const MockRenderer = require("./renderer");
const MockResourceLoader = require("./resourceLoader");

let resourceLoader = new MockResourceLoader();
resourceLoader.loadAllResources().then((resources) => {
    
    let renderer = new MockRenderer(resources);
    let engineCore = new EngineCore(new Physics(),renderer,new MockInputComponent(),new SchedulerFactory());
    
    engineCore.createStatic(0,550,1000,50);
    engineCore.createStatic(0,0,1000,50);
    engineCore.createStatic(0,50,50,500);
    engineCore.createStatic(950,50,50,500);
    
    engineCore.createStatic(150,500,50,50);
    engineCore.createStatic(250,450,50,50);
    engineCore.createStatic(350,400,50,50);
    engineCore.createStatic(450,350,50,50);
    engineCore.createStatic(550,300,50,50);
    engineCore.createStatic(650,250,50,50);
    engineCore.createStatic(750,200,50,50);
    engineCore.createStatic(850,150,50,50);

    engineCore.createPlayer(100,100);
    
    MainLoop.setUpdate((delta) => {
        let scaledDelta = delta/1000;
        engineCore.update(scaledDelta);
    }).start();
});