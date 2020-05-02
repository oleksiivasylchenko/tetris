import * as PIXI from "pixi.js";
import Model from "./Model";

export default class {

    protected stageContainer:PIXI.Container;
    protected model: Model;

    constructor(stageContainer:PIXI.Container, model:Model) {
        this.stageContainer = stageContainer;
        this.model = model;
    }

    moveFigureToContainer() {
        const fullLines = this.model.getFullLines();

        Object.keys(fullLines) && this.stageContainer.children.forEach((brick:PIXI.Container) => {

            if (Object.keys(fullLines).includes('' + brick.getGlobalPosition().y)) {
                const y = brick.getGlobalPosition().y;
                this.stageContainer.removeChild(brick);
                fullLines[y]--;

                if (fullLines[y] === 0) {
                    delete fullLines[y];
                }

                this.model.setFullLines(fullLines);
            }
        });
    }

    moveFigureToStage() {
        this.model.getCurrentFigure().children.forEach(b => {
            const position = b.getGlobalPosition();
            this.stageContainer.addChild(b);
            b.position = position;
        });
    }
}
