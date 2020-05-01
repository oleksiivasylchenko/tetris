import * as PIXI from 'pixi.js';
import {BRICK_WIDTH, COORDINATE} from "./config";

export default class extends PIXI.Container {

    constructor(color: number, coords:COORDINATE) {
        super();

        const g = new PIXI.Graphics();
        g.beginFill(color);
        g.drawRect(0,0, BRICK_WIDTH, BRICK_WIDTH);

        this.addChild(g);
        this.position.x = coords.x * BRICK_WIDTH;
        this.position.y = coords.y * BRICK_WIDTH;
    }

}
