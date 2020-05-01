import * as PIXI from 'pixi.js';
import {BRICK_WIDTH, COORDINATE, FIGURE, FIGURES_MAP, HEIGHT, STEP_DELAY, WIDTH} from "./config";
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
        this.addNextFigure();

        this.step = this.step.bind(this);
        this.step();
    }

    step() {
        setTimeout(() => {
            requestAnimationFrame(this.step);
        }, STEP_DELAY);

        if (this.isNextPosition()) {
            this.moveFigureToStage();
            this.addNextFigure();
        } else {
            this.currentFigure.position.y += BRICK_WIDTH;

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

    protected isNextPosition() {
        // Check moving down
        const coords = this.currentFigure.getCoordsIfMove(0, 1);

        return coords.some((c:COORDINATE) => {
            // Figure should be inside mainContainer
            // Figure should not overlap another one
            if (this.isOutsideScene(c) || this.isOverlap(c)) {
                return true;
            }

            return false;
        })
    }

    protected isOutsideScene(brick:COORDINATE) {
        return brick.x < 0 || brick.x >= WIDTH * BRICK_WIDTH || brick.y >= HEIGHT * BRICK_WIDTH;
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
}
