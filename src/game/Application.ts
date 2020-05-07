import * as PIXI from 'pixi.js';
import {STEP_DELAY} from "./config";
import Module from "./Stage/Module";

export class Application {

    timeStart: number;
    tickerId: NodeJS.Timeout;
    stage: PIXI.Container;

    constructor(stage) {
        this.stage = stage;
    }

    async start() {
        const module = new Module(this.stage);
        this.timeStart = new Date().getTime();
        const fps = 1000 / 2000;
        this.tickerId = setInterval(() => requestAnimationFrame(this.ticker), fps);
    }

    ticker = (timeEnd:number) => {
        if (!this.timeStart) this.timeStart = timeEnd;
        const progress = timeEnd - this.timeStart;

        if (progress >= STEP_DELAY) {
            delete this.timeStart;
        }
    }

}
