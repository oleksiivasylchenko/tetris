import {ImageFactory} from "../ImageFactory";
import {COLOR, COORDS} from "./Module";
import Brick from "./elements/Brick";

export default class {

    stage: PIXI.Container;
    imageFactory: ImageFactory;

    constructor(stage:PIXI.Container) {
        this.stage = stage;

        this.imageFactory = new ImageFactory();
    }

    updateStage(coords:COORDS, color:COLOR) {
        const brick = this.getBrick(coords, color);
        brick.name = this.getNameByCoords(coords);

        requestAnimationFrame(() => this.stage.addChild(brick));
    }

    deleteFromStage(coords:COORDS) {
        const name = this.getNameByCoords(coords);
        const brick = this.stage.getChildByName(name);

        requestAnimationFrame(() => this.stage.removeChild(brick));
    }

    protected getBrick(coords:COORDS, color:COLOR) {
        return new Brick(coords, color);
    }

    protected getNameByCoords(coords:COORDS) {
        return `${coords.y}_${coords.x}`;
    }
}
