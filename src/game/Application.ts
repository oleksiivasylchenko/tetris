import * as PIXI from 'pixi.js';
import {BRICK_WIDTH, COORDINATE, FIGURE, FIGURES_MAP, HEIGHT, STEP_DELAY, WIDTH} from "./config";
import {BaseFigure} from "./BaseFigure";

export class Application {

    currentFigure:BaseFigure;
    mainContainer:PIXI.Container;

    constructor(stage) {
        this.mainContainer = new PIXI.Container();
        stage.addChild(this.mainContainer);
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

        // Figure should be inside mainContainer
        // Check moving down
        const coords = this.currentFigure.getCoordsIfMove(0, 1);
        if (!coords.some((coords:COORDINATE) => coords.x < 0 || coords.x >= WIDTH * BRICK_WIDTH || coords.y >= HEIGHT * BRICK_WIDTH)) {
            this.currentFigure.position.y += BRICK_WIDTH;
        } else {
            this.addNextFigure();
        }


        //this.mainContainer.children
    }

    protected getRandomFigure():FIGURE {
        const index = Math.floor(Math.random() * FIGURES_MAP.length);
        return FIGURES_MAP[index];
    }

    protected addNextFigure() {
        this.currentFigure = new BaseFigure(this.getRandomFigure());
        this.mainContainer.addChild(this.currentFigure);
    }
}
