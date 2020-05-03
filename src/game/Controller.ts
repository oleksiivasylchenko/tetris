import {BRICK_WIDTH, FIGURE, FIGURES_MAP, WIDTH} from "./config";
import * as PIXI from "pixi.js";
import {BaseFigure} from "./BaseFigure";
import Model from "./Model";

export default class Controller {

    protected stageContainer:PIXI.Container;
    protected model: Model;

    constructor(stageContainer:PIXI.Container, model:Model) {
        this.stageContainer = stageContainer;
        this.model = model;
    }

    processOperations() {
        const f = this.model.getOperation();

        if (f !== undefined) {
            f();
            this.processOperations();
        }
    }

    addNextFigure(tempContainer:PIXI.Container, f:Function) {
        this.addOperation(() => {
            const currentFigure = this.getRandomFigure();
            tempContainer.addChild(currentFigure);
            f(currentFigure);
        });
    }

    getFullLines():number[] {
        const bricksPerLineMap = this.getBricksPerLine();

        return Controller.getFullLines(bricksPerLineMap);
    }

    moveToMainLayer(figure:BaseFigure, finalAction) {
        figure.children.forEach((b:PIXI.Container, index) => {
            const operation = () => {
                const position = b.getGlobalPosition();
                this.stageContainer.addChild(b);
                b.position = position;

                // Final action
                (index === figure.children.length - 1) && finalAction();
            };

            this.addOperation(operation);
        });
    }

    removeFullLines(fullLines:number[]) {

        this.stageContainer.children.forEach((brick:PIXI.Container) => {

            if (fullLines.includes(brick.getGlobalPosition().y)) {
                const operation = () => {
                    this.stageContainer.removeChild(brick);
                };

                this.addOperation(operation);
            }
        });
    }

    removeEmptyLines(fullLines:number[]) {

        fullLines.sort().forEach((lineIndex:number) => {
            const bricksUpper = this.stageContainer.children.filter((brick:PIXI.Container) => brick.getGlobalPosition().y < lineIndex);

            if (bricksUpper.length) {
                bricksUpper.map((brick:PIXI.Container) => {
                    this.addOperation(() => {
                        brick.position.y += BRICK_WIDTH;
                    });
                });
            }
        });

    }

    addOperation(f:Function) {
        this.model.addOperation(f);
    }

    gameOver() {
        const t = new PIXI.Text('Game Over');
        t.position.x = 10;
        t.position.y = 20;
        this.stageContainer.addChild(t);
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

    protected static getFullLines(bricksPerLineMap:any):number[] {
        return Object.keys(bricksPerLineMap)
            .reduce((fullLines, key) => {
                if (bricksPerLineMap[key] === WIDTH) {
                    fullLines.push(+key);
                }

                return fullLines;
            }, []);
    }

    protected getRandomFigureIndex():FIGURE {
        const index = Math.floor(Math.random() * FIGURES_MAP.length);
        return FIGURES_MAP[index];
    }

    protected getRandomFigure() {
        return new BaseFigure(this.getRandomFigureIndex());
    }

}
