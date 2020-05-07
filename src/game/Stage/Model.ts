import {COLOR, COORDS, MODEL_EVENTS} from "./Module";
import BricksMap from "./BricksMap";
import {FIGURE, HEIGHT, WIDTH} from "../config";
import Figure from "./Figure";

export default class Model {

    protected events:MODEL_EVENTS;
    protected stage:BricksMap = new BricksMap();
    protected figure:Figure;

    constructor(events:MODEL_EVENTS) {
        this.events = events;
    }

    addFigure(config:FIGURE) {
        this.figure = new Figure(config);
        this.drawFigure();
    }

    canMoveDown():boolean {
        const newCoords = this.figure.getNewCoords(0, 1);
        const isOnStage = !newCoords.some(c => c.x < 0 || c.x >= WIDTH || c.y >= HEIGHT);

        const coordsWithoutFigure = newCoords.filter(c => {
            return !this.figure.hasCoords(c);
        });

        const hasCollision = coordsWithoutFigure.some(c =>  this.stage.has(c));
        return isOnStage && !hasCollision;
    }

    moveDown() {
        this.figure && this.removeFigure();

        const newCoords = this.figure.getNewCoords(0, 1);

        this.drawFigure(newCoords);
    }

    setBrick(coords:COORDS, color:COLOR) {
        this.stage.set(coords, color);
        this.events.onModelUpdate(coords, color);
    }

    hasBrick(coords:COORDS) {
        return this.stage.has(coords);
    }

    deleteBrick(coords:COORDS) {
        this.stage.delete(coords);
        this.events.onModelDelete(coords);
    }

    protected drawFigure(newCoords?:COORDS[]) {
        newCoords && this.figure.setCoords(newCoords);

        this.figure.forEach((coords:COORDS) => {
            this.setBrick(coords, this.figure.getColor());
        });
    }

    protected removeFigure() {
        this.figure.forEach((coords:COORDS) => this.deleteBrick(coords));
    }

}
