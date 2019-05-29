let config = {
    debug: false,
    imageRoot: "/public/img",
    spriteRoot:"/public/sprites",
    hres:1920,
    vres:1080,
};

module.exports = window.gameConfig?{...config, ...window.gameConfig}:config;