import * as PIXI from 'pixi.js';
import {BRICK_WIDTH, COORDINATE} from "./config";
import {ImageFactory} from "./ImageFactory";

export default class extends PIXI.Sprite {

    constructor(imageFactory:ImageFactory, color: string, coords:COORDINATE) {
        super();

        const image = imageFactory.getImage(color);

        this.texture = PIXI.Texture.from(image);

        /*const g = new PIXI.Graphics();
        //this.texture = texture;
        g.beginFill(color);
        g.drawRect(0,0, BRICK_WIDTH, BRICK_WIDTH);*/

        //this.addChild(g);
        this.position.x = coords.x * BRICK_WIDTH;
        this.position.y = coords.y * BRICK_WIDTH;



    }

}
