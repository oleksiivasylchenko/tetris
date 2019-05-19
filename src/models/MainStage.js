import Figure from './Figure';

import {
  WIDTH,
  HEIGHT,
} from '../config';

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
    const f1 = new Figure([
      {x: 0 + this.items.length + 1,y: 0},
      {x: 1 + this.items.length + 1, y: 0},
      {x: 0 + this.items.length + 1, y: 1},
      {x: 0 + this.items.length + 1, y: 2},
    ], 0xFFFF00);

    this.addItem(f1);
    this.currentItem = f1;
    this.stage.addChild(f1.getElement());
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
