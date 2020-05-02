import * as PIXI from "pixi.js";
import Model from "./Model";

export default class {

    protected stageContainer:PIXI.Container;
    protected model: Model;

    constructor(stageContainer:PIXI.Container, model:Model) {
        this.stageContainer = stageContainer;
        this.model = model;
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
