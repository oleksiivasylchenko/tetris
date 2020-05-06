import {COORDINATE, FIGURES_MAP} from "./config";
import {BaseFigure} from "./BaseFigure";
import {ImageFactory} from "./ImageFactory";

export default class {

    map: Map<COORDINATE, BaseFigure> = new Map();

    constructor(imageFactory:ImageFactory) {
        this.map.set({x: 1, y: 1}, new BaseFigure(imageFactory, FIGURES_MAP[1]));
    }
}
