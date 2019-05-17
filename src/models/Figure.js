import * as PIXI from 'pixi.js'

import Box from './Box';

const step = 16;

export default class Figure {

  items = [];
  container = null;

  constructor(itemsMap, color) {

    itemsMap.map(item => {
      const box = new Box(item, color);
      this.items.push(box)
    });

    this.container = this.generateElement();
  }

  generateElement() {
    const container = new PIXI.Container();

    this.items.map(item => {
      const box = item.getElement();
      container.addChild(box);
    });

    return container;
  }

  getElement () {
    return this.container;
  }

  moveDown() {
    this.container.y = this.getNextDownCoords();
  }

  getCoordsExtended () {
    return this.items.map(item => item.getCoords({
      x: this.container.x / step,
      y: this.container.y / step,
    }));
  }

  getNextDownCoords () {
    return this.container.y + step;
  }

  getNextDownCoordsExtended () {
    return this.items.map(item => item.getNextDownCoords({
      x: this.container.x / step,
      y: this.container.y / step,
    }));
  }
}
