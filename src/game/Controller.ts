import {FIGURE, FIGURES_MAP, WIDTH} from "./config";
import * as PIXI from "pixi.js";
import {BaseFigure} from "./BaseFigure";
import GraphicController from './GraphicController';
import Model from "./Model";

export default class Controller {

    protected stageContainer:PIXI.Container;
    protected model: Model;

    constructor(stageContainer:PIXI.Container, model:Model) {
        this.stageContainer = stageContainer;
        this.model = model;
    }

    processOperation() {
        const f = this.model.getOperation();
        f();
    }

    getRandomFigure() {
        return new BaseFigure(this.getRandomFigureIndex());
    }

    getFullLines():{number:number} {
        const bricksPerLineMap = this.getBricksPerLine();

        return Controller.getFullLines(bricksPerLineMap);
    }

    moveToMainLayer(figure:BaseFigure, finalAction) {
        figure.children.forEach((b:PIXI.Container, index) => {
            const operation = () => {
                GraphicController.moveFigureToStage(this.stageContainer, b);
                (index === figure.children.length - 1) && finalAction();
            };

            this.model.addOperation(operation);
        });
    }

    protected getBricksPerLine() {
        return this.stageContainer.children
            .reduce((res:any, brick:PIXI.Container) => {
                if (res[brick.position.y]) {
                    res[brick.position.y]++;
                } else {
                    res[brick.position.y] = 1;
                }

                return res;
            }, {});
    }

    protected static getFullLines(bricksPerLineMap:any):any {
        return Object.keys(bricksPerLineMap)
            .reduce((fullLines, key) => {
                if (bricksPerLineMap[key] === WIDTH) {
                    fullLines[key] = bricksPerLineMap[key];
                }

                return fullLines;
            }, {});
    }

    protected getRandomFigureIndex():FIGURE {
        const index = Math.floor(Math.random() * FIGURES_MAP.length);
        return FIGURES_MAP[index];
    }

}
