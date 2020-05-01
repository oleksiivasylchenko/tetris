import * as PIXI from 'pixi.js'
import {FIGURES_MAP, STEP_DELAY} from "./config";
import {BaseFigure} from "./BaseFigure";

export class Application {

    stage = null;
    t = null;

    constructor(stage) {
        this.stage = stage;
    }

    start() {
        this.t = new PIXI.Text("hello", {color: "#ff000"});
        this.stage.addChild(this.t);

        this.step = this.step.bind(this);
        this.step();


        new BaseFigure(FIGURES_MAP[0]);
    }

    step() {
        setTimeout(() => {
            requestAnimationFrame(this.step);
        }, STEP_DELAY);

        this.t.position.y += 10;
    }

}
