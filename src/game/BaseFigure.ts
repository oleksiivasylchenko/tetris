import * as PIXI from 'pixi.js';
import {BRICK_WIDTH, COORDINATE, FIGURE, OFFSET_X, OFFSET_Y, WIDTH} from "./config";
import Brick from "./Brick";
import {ImageFactory} from "./ImageFactory";

export class BaseFigure extends PIXI.Container {

    imageFactory:ImageFactory;
    config: FIGURE;

    constructor(imageFactory:ImageFactory, config:FIGURE) {
        super();

        this.imageFactory = imageFactory;
        this.config = config;

        const {color} = config;

        config.coords.forEach((coords:COORDINATE) => {
            this.addChild(new Brick(imageFactory, color, coords));
        });

        this.pivot.set(this.config.center.x * BRICK_WIDTH, this.config.center.y * BRICK_WIDTH);
        this.position.x = Math.floor(WIDTH / 2 - 1) * BRICK_WIDTH + this.config.center.x * BRICK_WIDTH;
        this.position.y = this.config.center.y * BRICK_WIDTH;
    }

    // Get coordinates if figure will be moved to offsetX, offsetY
    getCoordsIfMove(offsetX:OFFSET_X, offsetY:OFFSET_Y):COORDINATE[] {
        return this.children.map(brick => {
            const {x, y} = brick.getGlobalPosition();

            return {
                x: x - this.pivot.x + offsetX * BRICK_WIDTH,
                y: y - this.pivot.y + offsetY * BRICK_WIDTH
            }
        });
    }

    rotate() {
        this.rotation += Math.PI / 2; // +90 degrees
    }

    getClone() {
        const clone = new PIXI.Container();
        this.children.forEach(b => {
            const {x, y} = b.position;

            clone.addChild(new Brick(this.imageFactory, 'green', {
                x: x / BRICK_WIDTH,
                y: y / BRICK_WIDTH,
            }));
        });

        clone.position = this.position;
        clone.rotation = Math.PI / 2;

        clone.pivot.set(this.config.center.x * BRICK_WIDTH, this.config.center.y * BRICK_WIDTH);
        clone.position.x += this.config.center.x * BRICK_WIDTH;
        clone.position.y += this.config.center.y * BRICK_WIDTH;

        return clone;
    }

}
