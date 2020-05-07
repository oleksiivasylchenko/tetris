import {COLOR, COORDS} from "./Module";

export default class BricksMap {

    protected map: Map<number, Map<number, COLOR>> = new Map<number, Map<number, COLOR>>();

    set(coords:COORDS, color:COLOR):BricksMap {
        const xMap = this.map.has(coords.y) ? this.map.get(coords.y) : new Map();
        xMap.set(coords.x, color);
        this.map.set(coords.y, xMap);

        return this;
    }

    has(coords:COORDS):boolean {
        return this.map.has(coords.y) && this.map.get(coords.y).has(coords.x);
    }

    delete(coords:COORDS):BricksMap {
        if (this.map.has(coords.y) && this.map.get(coords.y).has(coords.x)) {
            this.map.get(coords.y).delete(coords.x);

            if (!this.map.get(coords.y).size) {
                this.map.delete(coords.y);
            }
        }

        return this;
    }
}
