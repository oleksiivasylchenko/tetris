import * as PIXI from 'pixi.js'

const step = 16;

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
    graphics.drawRect(0, 0, step, step);

    graphics.x = this.x * step;
    graphics.y = this.y * step;

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
