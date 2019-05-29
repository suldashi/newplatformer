/*
    Note: 
    speed is used in this manner: 60fps multiplied by the speed variable. An animation with a speed of 1/6 will play at 10 fps.
    If there are 6 frames in this animation, it will loop every 0.6 seconds (600ms).
*/ 

module.exports = {
    images: {
        idle: {
            baseName:"player"
        },
        firing: {
            baseName:"player"
        },
    },
    sheets: 
    {
        player:{
            url:"player.png",
            data:"player.json"
        },
    },
    animations: []
};