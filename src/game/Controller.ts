import {FIGURE, FIGURES_MAP, WIDTH} from "./config";
import * as PIXI from "pixi.js";
import {BaseFigure} from "./BaseFigure";

export default class Controller {

    protected stageContainer:PIXI.Container;

    constructor(stageContainer:PIXI.Container) {
        this.stageContainer = stageContainer;
    }

    getRandomFigure() {
        return new BaseFigure(this.getRandomFigureIndex());
    }

    getFullLines():{number:number} {
        const bricksPerLineMap = this.getBricksPerLine();

        return Controller.getFullLines(bricksPerLineMap);
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
