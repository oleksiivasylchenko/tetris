import * as PIXI from 'pixi.js';
import {BRICK_WIDTH, FIGURE, FIGURES_MAP, OFFSET_X, OFFSET_Y, STEP_DELAY} from "./config";
import {BaseFigure} from "./BaseFigure";
import Model, {MODE} from "./Model";
import Controller from "./Controller";
import {isEdgePosition, isFinalPosition} from "./PositionChecker";
import GraphicController from "./GraphicController";

export class Application {

    currentFigure:BaseFigure = null;
    stageContainer:PIXI.Container;
    tempContainer:PIXI.Container;
    timeStart: number;
    model: Model = new Model();
    controller: Controller;
    graphController: GraphicController;

    constructor(stage) {

        this.stageContainer = new PIXI.Container();
        this.tempContainer = new PIXI.Container();

        this.controller = new Controller(this.stageContainer, this.model);
        this.graphController = new GraphicController(this.stageContainer, this.model);

        stage.addChild(this.stageContainer);
        stage.addChild(this.tempContainer);
    }

    start() {
        window.document.addEventListener('keyup', this.onKeyDown.bind(this));

        //this.timeStart = new Date().getTime();
        const fps = 1000 / 2000;
        setInterval(() => requestAnimationFrame(this.ticker), fps);
    }

    ticker = (timeEnd:number) => {
        if (!this.timeStart) this.timeStart = timeEnd;
        const progress = timeEnd - this.timeStart;

        if (this.model.hasOperation()) {
            this.controller.processOperation();
        } else if (this.model.isMode(MODE.removeFullLines)) {
            this.graphController.moveFigureToContainer();

            if (!Object.keys(this.model.getFullLines()).length) {
                this.model.setNextMode();
            }
        } else if (this.model.isMode(MODE.fillEmptyLines)) {
            this.graphController.fillEmptyLines();

            if (!this.model.getEmptyLines().size) {
                console.log('NEXT!!!');
                this.model.setNextMode();
            }
        /*} else if (this.model.isMode(MODE.moveToMainLayer)) {
            this.graphController.moveFigureToStage();

            if (!this.model.getCurrentFigure().children.length) {
                this.model.setNextMode();
                this.currentFigure = null;
            }*/
        } else {
            this.checkPosition();

            if (progress >= STEP_DELAY && this.step()) {
                delete this.timeStart;
            }

            this.checkFullLines();
        }
    };

    checkPosition(offsetX:OFFSET_X = 0, offsetY:OFFSET_Y = 1) {
        if (this.currentFigure === null) {
            this.addNextFigure();
        }

        if (!isEdgePosition(this.currentFigure, offsetX, offsetY)) {
            if (isFinalPosition(this.stageContainer, this.currentFigure, offsetX, offsetY)) {
                this.controller.moveToMainLayer(this.currentFigure, () => {
                    this.currentFigure = null;
                });
            }
        }
    }

    step(offsetX:OFFSET_X = 0, offsetY:OFFSET_Y = 1) {
        if (!isEdgePosition(this.currentFigure, offsetX, offsetY) && !isFinalPosition(this.stageContainer, this.currentFigure, offsetX, offsetY)) {
            this.currentFigure.position.x += BRICK_WIDTH * offsetX;
            this.currentFigure.position.y += BRICK_WIDTH * offsetY;
            return true;
        }

        return false;
    }

    protected addNextFigure() {
        this.currentFigure = this.controller.getRandomFigure();
        this.tempContainer.addChild(this.currentFigure);
    }

    protected onKeyDown(event) {
        if (event.code === 'ArrowDown') {
            requestAnimationFrame(() => this.step(0, 1));
        } else if (event.code === 'ArrowRight') {
            requestAnimationFrame(() => this.step(1, 0));
        } else if (event.code === 'ArrowLeft') {
            requestAnimationFrame(() => this.step(-1, 0));
        }
    }

    protected checkFullLines() {

        const fullLines = this.controller.getFullLines();

        if (Object.keys(fullLines).length) {
            this.model.setMode(MODE.removeFullLines, MODE.fillEmptyLines);
            this.model.setFullLines(fullLines);
        }
    }
}
