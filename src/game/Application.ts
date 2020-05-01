import * as PIXI from 'pixi.js';
import {BRICK_WIDTH, COORDINATE, FIGURE, FIGURES_MAP, HEIGHT, OFFSET_X, OFFSET_Y, STEP_DELAY, WIDTH} from "./config";
import {BaseFigure} from "./BaseFigure";

export class Application {

    currentFigure:BaseFigure;
    stageContainer:PIXI.Container;
    tempContainer:PIXI.Container;

    constructor(stage) {
        this.stageContainer = new PIXI.Container();
        this.tempContainer = new PIXI.Container();

        stage.addChild(this.stageContainer);
        stage.addChild(this.tempContainer);
    }

    start() {
        window.document.addEventListener('keyup', this.onKeyDown.bind(this));

        this.addNextFigure();

        this.step = this.step.bind(this);
        this.step();
    }

    step(offsetX:OFFSET_X = 0, offsetY:OFFSET_Y = 1, userAction:boolean = false) {
        if (!userAction) {
            setTimeout(() => {
                requestAnimationFrame(() => this.step());
            }, STEP_DELAY);
        }

        if (!this.isEdgePosition(offsetX, offsetY)) {

            if (this.isFinalPosition(offsetX, offsetY)) {
                this.moveFigureToStage();
                this.addNextFigure();
            } else {
                this.currentFigure.position.x += BRICK_WIDTH * offsetX;
                this.currentFigure.position.y += BRICK_WIDTH * offsetY;
            }
        }
    }

    protected getRandomFigure():FIGURE {
        const index = Math.floor(Math.random() * FIGURES_MAP.length);
        return FIGURES_MAP[index];
    }

    protected addNextFigure() {
        this.currentFigure = new BaseFigure(this.getRandomFigure());
        this.tempContainer.addChild(this.currentFigure);
    }

    protected isFinalPosition(offsetX:OFFSET_X, offsetY:OFFSET_Y) {
        const coords = this.currentFigure.getCoordsIfMove(offsetX, offsetY);

        return coords.some((c:COORDINATE) => {
            // Figure should be inside mainContainer
            // Figure should not overlap another one
            if (this.isOutsideScene(c) || this.isOverlap(c)) {
                return true;
            }

            return false;
        })
    }

    protected isEdgePosition(offsetX:OFFSET_X, offsetY:OFFSET_Y) {
        const coords = this.currentFigure.getCoordsIfMove(offsetX, offsetY);
        return coords.some((brick:COORDINATE) => brick.x < 0 || brick.x >= WIDTH * BRICK_WIDTH);
    }


    protected isOutsideScene(brick:COORDINATE) {
        return brick.y >= HEIGHT * BRICK_WIDTH;
    }

    protected isOverlap(brick:COORDINATE) {
        return this.stageContainer.children
            .some(c => c.position.x == brick.x && c.position.y == brick.y);
    }

    protected moveFigureToStage() {
        this.currentFigure.children.forEach(brick => {
            const position = brick.getGlobalPosition();
            this.stageContainer.addChild(brick);
            brick.position = position;
        });
    }

    protected onKeyDown(event) {
        if (event.code === 'ArrowDown') {
            requestAnimationFrame(() => this.step(0, 1, true));
        } else if (event.code === 'ArrowRight') {
            requestAnimationFrame(() => this.step(1, 0, true));
        } else if (event.code === 'ArrowLeft') {
            requestAnimationFrame(() => this.step(-1, 0, true));
        }
    }
}
