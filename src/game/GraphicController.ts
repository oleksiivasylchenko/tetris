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
                    this.model.addEmptyLine(y);
                    delete fullLines[y];
                }

                this.model.setFullLines(fullLines);
            }
        });
    }

    static moveFigureToStage(stageContainer:PIXI.Container, b:PIXI.Container) {
        const position = b.getGlobalPosition();
        stageContainer.addChild(b);
        b.position = position;
    }

    fillEmptyLines() {
        if (this.model.getEmptyLines().size) {
            const lineIndexes = Array.from(this.model.getEmptyLines());
            const maxIndex = Math.max(...lineIndexes);
            console.log(maxIndex, 'maxIndex');

            const bricksUpper = this.stageContainer.children.filter((brick:PIXI.Container) => brick.getGlobalPosition().y < maxIndex);

            console.log(bricksUpper.length, 'bricksUpper.length');
            if (bricksUpper.length) {
                bricksUpper.map((brick:PIXI.Container) => {
                    brick.position.y++;
                });
            } else {
                this.model.removeEmptyLine(maxIndex);
            }
        }

    }
}
