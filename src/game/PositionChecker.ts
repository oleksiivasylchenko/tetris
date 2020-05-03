import {BaseFigure} from "./BaseFigure";
import {BRICK_WIDTH, COORDINATE, HEIGHT, OFFSET_X, OFFSET_Y, WIDTH} from "./config";

const isOutsideScene = (brick:COORDINATE) => brick.y >= HEIGHT * BRICK_WIDTH;

const isOverlap = (stageContainer:PIXI.Container, brick:COORDINATE) => stageContainer.children
        .some(c => c.position.x == brick.x && c.position.y == brick.y);

export const isEdgePosition = (currentFigure: BaseFigure, offsetX:OFFSET_X, offsetY:OFFSET_Y) => {
    const coords = currentFigure.getCoordsIfMove(offsetX, offsetY);
    return coords.some((brick:COORDINATE) => brick.x < 0 || brick.x >= WIDTH * BRICK_WIDTH);
};

export const isGameOverPosition = (stageContainer:PIXI.Container, currentFigure: BaseFigure, offsetX:OFFSET_X, offsetY:OFFSET_Y) => {
    const coords = currentFigure.getCoordsIfMove(offsetX, offsetY);
    return coords.some((c:COORDINATE) => isOverlap(stageContainer, c) && c.y === BRICK_WIDTH);
};

export const isFinalPosition = (stageContainer:PIXI.Container, currentFigure: BaseFigure, offsetX:OFFSET_X, offsetY:OFFSET_Y) => {
    const coords = currentFigure.getCoordsIfMove(offsetX, offsetY);
    return coords.some((c:COORDINATE) => isOutsideScene(c) || isOverlap(stageContainer, c));
};
