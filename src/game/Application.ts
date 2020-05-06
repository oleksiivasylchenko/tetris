import * as PIXI from 'pixi.js';
import {STEP_DELAY} from "./config";
import {ImageFactory} from "./ImageFactory";

export class Application {

    stageContainer:PIXI.Container;
    tempContainer:PIXI.Container;
    timeStart: number;
    tickerId: NodeJS.Timeout;
    imageFactory:ImageFactory;

    constructor(stage) {
        this.imageFactory = new ImageFactory();

        this.stageContainer = new PIXI.Container();
        this.tempContainer = new PIXI.Container();

        stage.addChild(this.tempContainer);
        stage.addChild(this.stageContainer);
    }

    async start() {
        await this.imageFactory.loadImages();

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
