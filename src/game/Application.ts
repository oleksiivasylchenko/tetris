import * as PIXI from 'pixi.js';
import {BRICK_WIDTH, FIGURE, FIGURES_MAP, OFFSET_X, OFFSET_Y, WIDTH} from "./config";
import {BaseFigure} from "./BaseFigure";
import Model from "./Model";
import Controller from "./Controller";
import {isEdgePosition, isFinalPosition} from "./PositionCheker";

export class Application {

    currentFigure:BaseFigure = null;
    stageContainer:PIXI.Container;
    tempContainer:PIXI.Container;
    timeStart: number;
    model: Model = new Model();
    controller: Controller = new Controller();

    constructor(stage) {

        this.stageContainer = new PIXI.Container();
        this.tempContainer = new PIXI.Container();

        stage.addChild(this.stageContainer);
        stage.addChild(this.tempContainer);
    }

    start() {
        window.document.addEventListener('keyup', this.onKeyDown.bind(this));

        //this.timeStart = new Date().getTime();
        const fps = 1000 / 2000;
        setInterval(() => requestAnimationFrame(this.ticker), fps);

        this.moveFigureToStage = this.moveFigureToStage.bind(this);
    }

    ticker = (timeEnd:number) => {
        if (!this.timeStart) this.timeStart = timeEnd;
        const progress = timeEnd - this.timeStart;

        this.checkPosition();
        if (progress >= 1000) {
            if (this.step()) {
                delete this.timeStart;
            }
        }
    };

    checkPosition(offsetX:OFFSET_X = 0, offsetY:OFFSET_Y = 1, userAction:boolean = false) {
        if (this.currentFigure === null) {
            this.addNextFigure();
        }

        if (!isEdgePosition(this.currentFigure, offsetX, offsetY)) {
            if (isFinalPosition(this.stageContainer, this.currentFigure, offsetX, offsetY)) {
                this.moveFigureToStage();
            }
        }

        this.removeFullLines();
    }

    step(offsetX:OFFSET_X = 0, offsetY:OFFSET_Y = 1, userAction:boolean = false) {
        if (!isEdgePosition(this.currentFigure, offsetX, offsetY) && !isFinalPosition(this.stageContainer, this.currentFigure, offsetX, offsetY)) {
            this.currentFigure.position.x += BRICK_WIDTH * offsetX;
            this.currentFigure.position.y += BRICK_WIDTH * offsetY;
            return true;
        }

        return false;
    }

    protected getRandomFigure():FIGURE {
        const index = Math.floor(Math.random() * FIGURES_MAP.length);
        return FIGURES_MAP[index];
    }

    protected addNextFigure() {
        this.currentFigure = new BaseFigure(this.getRandomFigure());
        this.tempContainer.addChild(this.currentFigure);
    }

    protected moveFigureToStage() {
        this.currentFigure.children.forEach(b => {
            const position = b.getGlobalPosition();
            this.stageContainer.addChild(b);
            b.position = position;
            console.log(b, 'MOVE');
        });

        if (!this.currentFigure.children.length) {
            this.currentFigure = null;
        }
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

    protected removeFullLines() {
        const bricksPerLineMap = this.stageContainer.children.reduce((res:any, brick:PIXI.Container) => {
            if (res[brick.position.y]) {
                res[brick.position.y]++;
            } else {
                res[brick.position.y] = 1;
            }

            return res;
        }, {});


        //console.log(bricksPerLineMap, 'bricksPerLineMap');

        const fullLines = Object.keys(bricksPerLineMap).reduce((fullLines, key) => {
            if (bricksPerLineMap[key] === WIDTH) {
                fullLines.push(+key);
            }

            return fullLines;
        }, []);

        fullLines.length && this.stageContainer.children.forEach((brick:PIXI.Container) => {

            console.log(fullLines, brick.getGlobalPosition().y);
            if (fullLines.includes(brick.getGlobalPosition().y)) {
                this.stageContainer.removeChild(brick);
            }
        });
    }
}
