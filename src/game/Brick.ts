import * as PIXI from 'pixi.js';
import {BRICK_WIDTH, COORDINATE} from "./config";
import {ImageFactory} from "./ImageFactory";

export default class extends PIXI.Sprite {

    constructor(imageFactory:ImageFactory, color: string, coords:COORDINATE) {
        super();

        const image = imageFactory.getImage(color);

        this.texture = PIXI.Texture.from(image);

        this.pivot.x = BRICK_WIDTH / 2;
        this.pivot.y = BRICK_WIDTH / 2;

        this.position.x = coords.x * BRICK_WIDTH + this.pivot.x;
        this.position.y = coords.y * BRICK_WIDTH + this.pivot.y;
    }

}
