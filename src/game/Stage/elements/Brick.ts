import * as PIXI from 'pixi.js';
import {BRICK_WIDTH} from "../../config";
import {COLOR, COORDS} from "../Module";

export default class extends PIXI.Sprite {

    constructor(coords:COORDS, color: COLOR) {

        super();

        this.texture = PIXI.Texture.from('public/images/block_' + color +'.png');

        this.pivot.x = BRICK_WIDTH / 2;
        this.pivot.y = BRICK_WIDTH / 2;

        this.position.x = coords.x * BRICK_WIDTH + this.pivot.x;
        this.position.y = coords.y * BRICK_WIDTH + this.pivot.y;
    }

}
