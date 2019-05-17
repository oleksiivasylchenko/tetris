import * as PIXI from 'pixi.js'
import Figure from './models/Figure';
import MainStage from './models/MainStage';

const step = 16;

const f1 = new Figure([
  {x: 0,y: 0},
  {x: 1, y: 0},
  {x: 0, y: 1},
  {x: 0, y: 2},
], 0xFFFF00);

const f2 = new Figure([
  {x: 1, y: 0},
  {x: 0, y: 1},
  {x: 1, y: 1},
  {x: 2, y: 1}
], 0xFF0000);

/*const f1Element = f1.getElement();
 const f2Element = f2.getElement();*/




let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

PIXI.utils.sayHello(type);

//Create a Pixi Application
let app = new PIXI.Application({
  width: 256,
  height: 256,
  //transparent: true,
  border: '1px solid red',
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//app.renderer.backgroundColor = 0x061639;

console.log(app.stage);

const renderer = PIXI.autoDetectRenderer();

// allow renderer to resize itself as needed
renderer.autoResize = true;

// make sure the drawing board has the size we want, width first, then height
renderer.resize(256, 256);

// Generate and start Tetris
const mainStage = new MainStage();
mainStage.start(app.stage);
