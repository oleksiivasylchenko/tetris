import {COLOR, COORDS} from "./Module";
import {FIGURE} from "../config";

export default class {

    protected coords:COORDS[];
    protected color: COLOR;

    constructor(config:FIGURE) {
        this.setCoords(config.coords);
        this.color = config.color;
    }

    setCoords(coords:COORDS[]) {
        this.coords = coords;
    }

    getColor():COLOR {
        return this.color;
    }

    hasCoords(coords:COORDS) {
        return this.coords.some(c => c.x === coords.x && c.y === coords.y);
    }

    public getNewCoords(offsetX:-1|0|1, offsetY:0|1):COORDS[] {
        return this.forEach((c:COORDS) => {
            c.x += offsetX;
            c.y += offsetY;

            return c;
        });
    }

    public forEach(callback):COORDS[] {
        return this.coords.map((c:COORDS) => {
            return callback({...c});
        });
    }

}
