export const enum MODE {
    idle = 'IDLE',
    moveToMainLayer = 'moveToMainLayer',
    removeFullLines = 'removeFullLines',
    fillEmptyLines = 'fillEmptyLines',
}

export default class {

    protected mode:MODE = MODE.idle;
    protected currentFigure: PIXI.Container;
    protected fullLines: {number:number};
    protected emptyLines: Set<number> = new Set<number>();
    protected nextMode:MODE;
    protected operations: Function[] = [];

    setMode(newMode:MODE, nextMode?:MODE) {
        this.mode = newMode;
        this.nextMode = nextMode ? nextMode : MODE.idle;
    }

    setNextMode() {
        this.mode = this.nextMode;
    }

    setFullLines(fullLines:{number:number}) {
        this.fullLines = fullLines;
    }

    getFullLines() {
        return this.fullLines;
    }

    addEmptyLine(emptyLineIndex:number) {
        this.emptyLines.add(emptyLineIndex);
    }

    removeEmptyLine(emptyLineIndex:number) {
        this.emptyLines.delete(emptyLineIndex);
    }

    getEmptyLines() {
        return this.emptyLines;
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

    addOperation(f:Function) {
        this.operations.push(f);
    }

    getOperation() {
        return this.operations.shift();
    }

    hasOperation() {
        return this.operations.length > 0;
    }
}
