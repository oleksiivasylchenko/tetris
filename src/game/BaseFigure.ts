import * as PIXI from 'pixi.js';
import {BRICK_WIDTH, COORDINATE, FIGURE, HEIGHT, OFFSET_X, OFFSET_Y, WIDTH} from "./config";
import Brick from "./Brick";

export class BaseFigure extends PIXI.Container {

    constructor(config:FIGURE) {
        super();

        const {color} = config;

        config.coords.forEach((coords:COORDINATE) => {
            this.addChild(new Brick(color, coords));
        });

        this.position.x = Math.floor(WIDTH / 2 - 1) * BRICK_WIDTH;
    }

    // Get coordinates if figure will be moved to offsetX, offsetY
    getCoordsIfMove(offsetX:OFFSET_X, offsetY:OFFSET_Y):COORDINATE[] {
        return this.children.map(brick => {
            const {x, y} = brick.getGlobalPosition();

            return {
                x: x + offsetX * BRICK_WIDTH,
                y: y + offsetY * BRICK_WIDTH
            }
        });
    }

}
