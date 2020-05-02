export const enum MODE {
    idle = 'IDLE',
    moveToMainLayer = 'moveToMainLayer',
    removeFullLines = 'removeFullLines',
}

export default class {

    protected mode:MODE = MODE.idle;
    protected currentFigure: PIXI.Container;
    protected fullLines:{number:number};

    setMode(newMode:MODE) {
        this.mode = newMode;
    }

    setFullLines(fullLines:{number:number}) {
        this.fullLines = fullLines;
    }

    getFullLines() {
        return this.fullLines;
    }

    setCurrentFigure(currentFigure:PIXI.Container) {
        this.currentFigure = currentFigure;
    }

    getCurrentFigure():PIXI.Container {
        return this.currentFigure;
    }

    isMode(mode:MODE) {
        return this.mode === mode;
    }
}
