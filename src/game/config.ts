// TYPES
export type COORDINATE = {
    x: number,
    y: number
};

export type FIGURE = {
    coords: COORDINATE[],
    color: number
};

export type OFFSET_X = -1|0|1;
export type OFFSET_Y = 0|1;

export const BRICK_WIDTH = 16;
export const WIDTH = 10;
export const HEIGHT = 20;

export const STEP_DELAY = 500;

export const FIGURES_MAP:FIGURE[] = [
    {
        coords: [
            {x: 0,y: 0},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: 2},
        ],
        color: 0xFFFF00,
    },
    {
        coords: [
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: 1, y: 1},
            {x: 2, y: 1},
        ],
        color: 0xFF0000
    },
    {
        coords: [
            {x: 0,y: 0},
            {x: 0, y: 1},
            {x: 0, y: 2},
            {x: 0, y: 3},
        ],
        color: 0xFF00FF,
    },
    {
        coords: [
            {x: 0,y: 0},
            {x: 0, y: 1},
            {x: 1, y: 0},
            {x: 1, y: 1},
        ],
        color: 0x00FFFF,
    },
];
