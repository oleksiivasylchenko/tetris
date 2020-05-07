// TYPES
import {COLOR, COORDS} from "./Stage/Module";

export type COORDINATE = {
    x: number,
    y: number
};

export type FIGURE = {
    coords: COORDS[],
    center: COORDS,
    color: COLOR
};

export type OFFSET_X = -1|0|1;
export type OFFSET_Y = 0|1;

export const BRICK_WIDTH = 16;
export const WIDTH = 10;
export const HEIGHT = 20;

export const STEP_DELAY = 500;

export const FIGURES_MAP:FIGURE[] = [
    {
        // xx
        // x
        // x
        coords: [
            {x: 0,y: 0},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: 2},
        ],
        center: {
            x: 0.5,
            y: 1.5,
        },
        color: COLOR.BLUE,
    },
    {
        //  x
        // xxx
        //
        coords: [
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: 1, y: 1},
            {x: 2, y: 1},
        ],
        center: {
            x: 1.5,
            y: 1.5,
        },
        color: COLOR.ORANGE,
    },
    {
        // x
        // x
        // x
        // x
        coords: [
            {x: 0,y: 0},
            {x: 0, y: 1},
            {x: 0, y: 2},
            {x: 0, y: 3},
        ],
        center: {
            x: 0.5,
            y: 2.5,
        },
        color: COLOR.GREEN,
    },
    {
        // xx
        // xx
        coords: [
            {x: 0,y: 0},
            {x: 0, y: 1},
            {x: 1, y: 0},
            {x: 1, y: 1},
        ],
        center: {
            x: 1,
            y: 1,
        },
        color: COLOR.YELLOW,
    },
];
