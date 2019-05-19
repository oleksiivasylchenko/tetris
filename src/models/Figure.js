import * as PIXI from 'pixi.js'

import Box from './Box';

import {
  STEP
} from '../config';

export default class Figure {

  items = [];
  container = null;

  constructor(itemsMap, color, offsetLeft) {

    itemsMap.map(item => {
      const box = new Box(item, color);
      this.items.push(box);
    });

    this.container = this.generateElement(offsetLeft);
  }

  generateElement(offsetLeft) {
    const container = new PIXI.Container();

    this.items.map(item => {
      const box = item.getElement();
      container.addChild(box);
    });

    container.x += offsetLeft;
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
      x: this.container.x / STEP,
      y: this.container.y / STEP,
    }));
  }

  getNextDownCoords () {
    return this.container.y + STEP;
  }

  getNextDownCoordsExtended () {
    return this.items.map(item => item.getNextDownCoords({
      x: this.container.x / STEP,
      y: this.container.y / STEP,
    }));
  }
}
