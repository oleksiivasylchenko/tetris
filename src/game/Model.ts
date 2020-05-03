export default class {

    protected operations: Function[] = [];

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
