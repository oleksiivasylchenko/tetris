// TYPES
export type COORDINATE = {
    x: number,
    y: number
};

export type FIGURE_CONFIG = {
    coords: COORDINATE[],
    color: number
};

export const STEP = 16;
export const WIDTH = 10;
export const HEIGHT = 20;

export const STEP_DELAY = 1000;

export const FIGURES_MAP:FIGURE_CONFIG[] = [
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
