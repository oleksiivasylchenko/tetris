import * as PIXI from 'pixi.js';
import {BRICK_WIDTH, COORDINATE, FIGURE, OFFSET_X, OFFSET_Y, WIDTH} from "./config";
import Brick from "./Brick";
import {ImageFactory} from "./ImageFactory";

export class BaseFigure extends PIXI.Container {

    constructor(imageFactory:ImageFactory, config:FIGURE) {
        super();

        const {color} = config;

        config.coords.forEach((coords:COORDINATE) => {
            this.addChild(new Brick(imageFactory, color, coords));
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

    getClone() {
        /*const clone = new PIXI.Container();
        this.children.forEach(b => {
            const {x, y} = b.position;

            clone.addChild(new Brick(0xff0000, {
                x: x / BRICK_WIDTH,
                y: y / BRICK_WIDTH,
            }));
        });

        const {x, y} = this.position;

        clone.pivot.set(clone.width / 2, clone.height / 2);
        clone.rotation = Math.PI / 2;
        clone.position.x = x + clone.width / 2;
        clone.position.y = y + clone.height / 2;

        return clone;*/
    }

}
