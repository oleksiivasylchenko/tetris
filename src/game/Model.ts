export default class {

    protected emptyLines: Set<number> = new Set<number>();
    protected operations: Function[] = [];

    removeEmptyLine(emptyLineIndex:number) {
        this.emptyLines.delete(emptyLineIndex);
    }

    getEmptyLines() {
        return this.emptyLines;
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
