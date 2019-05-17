import * as PIXI from 'pixi.js'

import {
  STEP
} from '../config';

export default class Box {
  x = 0;
  y = 0;
  color = 0x000000;

  constructor(map, color) {
    this.x = map.x;
    this.y = map.y;
    this.color = color;
  }

  getElement () {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(this.color);
    // draw a rectangle
    graphics.drawRect(0, 0, STEP, STEP);

    graphics.x = this.x * STEP;
    graphics.y = this.y * STEP;

    return graphics;
  }

  getCoords (offset) {
    return {
      x: this.x + offset.x,
      y: this.y + offset.y,
    };
  }

  getNextDownCoords (offset) {
    return {
      x: this.x + offset.x,
      y: this.y + offset.y + 1,
    };
  }
}
