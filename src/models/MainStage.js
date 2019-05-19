import Figure from './Figure';

import {
  STEP,
  WIDTH,
  HEIGHT,
  FIGURES_MAP,
} from '../config';

const offsetLeft = (WIDTH - 2) / 2 * STEP;

export default class MainStage {
  currentItem = null;
  items = [];
  stage = null;
  map = [];

  addItem (item) {
    this.items.push(item);
    //console.log(this.items, 'Added. All items:');
  }

  getItems () {
    return this.items;
  }

  start (stage) {
    this.stage = stage;
    this.tick();
    /*this.interval = setInterval(() => {
     this.tick();
     }, 500);*/
  }

  addNext () {
    const figureData = FIGURES_MAP[Math.floor(Math.random() * Math.floor(FIGURES_MAP.length))];
    const figure = new Figure(figureData.coords, figureData.color, offsetLeft);

    this.addItem(figure);
    this.currentItem = figure;
    this.stage.addChild(figure.getElement());
  }

  tick() {
    // Add first figure
    if (!this.items.length) {
      this.addNext();
    } else {
      const nextCoords = this.currentItem.getNextDownCoordsExtended();
      //console.log(this.map, 'this.map');
      const isPossible = nextCoords
        .every(item => {
          return (item.x < WIDTH && item.y < HEIGHT)
            && (this.map[item.x] === undefined || this.map[item.x][item.y] === undefined);
        });

      if (isPossible) {
        this.currentItem.moveDown();
      } else {
        //console.log(nextCoords, 'impossible');

        this.currentItem.getCoordsExtended().map(item => {
          if (this.map[item.x] === undefined) this.map[item.x] = [];
          this.map[item.x][item.y] = true;
        });

        this.addNext();
        clearInterval(this.interval);
      }
    }

    setTimeout(() => {
      this.tick();
    }, 300);
  }
}
