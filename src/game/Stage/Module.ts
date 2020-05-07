import Controller from "./Controller";
import Model from "./Model";
import View from "./View";

export type MODEL_EVENTS = {
    onModelUpdate: Function,
    onModelDelete: Function
};

export type COORDS = {
    x: number,
    y: number
}

export enum COLOR {
    GREEN = 'green',
    YELLOW = 'yellow',
    BLUE = 'blue',
    ORANGE = 'orange',
}

export default class {

    model:Model;
    view: View;
    controller:Controller;

    constructor(stage: PIXI.Container) {
        this.view = new View(stage);
        this.model = new Model({
            onModelUpdate: this.onModelUpdate.bind(this),
            onModelDelete: this.onModelDelete.bind(this)
        });

        this.controller = new Controller(this.model, this.view);
        this.controller.start();
    }

    onModelUpdate(coords:COORDS, color:COLOR) {
        this.controller.onModelUpdate(coords, color);
    }

    onModelDelete(coords:COORDS) {
        this.controller.onModelDelete(coords);
    }

}
