import * as PIXI from 'pixi.js';
import {Application} from "./game/Application";
import {HEIGHT, BRICK_WIDTH, WIDTH} from "./game/config";

window.onload = () => {

    let type = "WebGL";
    if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
    }

    PIXI.utils.sayHello(type);

    //Create a Pixi Application
    let app = new PIXI.Application({
        width: WIDTH * BRICK_WIDTH,
        height: HEIGHT * BRICK_WIDTH,
        //transparent: true,
        backgroundColor: 0xcccccc,
    });

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    const renderer = PIXI.autoDetectRenderer();

    // make sure the drawing board has the size we want, width first, then height
    renderer.resize(WIDTH * BRICK_WIDTH, HEIGHT * BRICK_WIDTH);

    // Generate and start Tetris
    const mainStage = new Application(app.stage);
    mainStage.start();

};
