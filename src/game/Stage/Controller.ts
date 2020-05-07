import View from "./View";
import {COLOR, COORDS, MODEL_EVENTS} from "./Module";
import Model from "./Model";
import {FIGURE, FIGURES_MAP} from "../config";

export default class implements MODEL_EVENTS {

    model:Model;
    view:View;

    constructor(model:Model, view:View) {
        this.model = model;
        this.view = view;
    }

    start() {
        this.addFigure();

        setInterval(() => {
            if (this.model.canMoveDown()) {
                this.model.moveDown();
            } else {
                this.addFigure();
            }
        }, 500);

    }

    onModelUpdate (coords:COORDS, color:COLOR) {
        this.view.updateStage(coords, color);
    }

    onModelDelete (coords:COORDS) {
        this.view.deleteFromStage(coords);
    }

    protected addFigure() {
        const config = this.getRandomFigure();
        this.model.addFigure(config);
    }
    protected getRandomFigure():FIGURE {
        const index = Math.floor(Math.random() * FIGURES_MAP.length);
        return FIGURES_MAP[index];
    }
}
