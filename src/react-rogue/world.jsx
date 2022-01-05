import { Map } from 'rot-js';
import Player from './player';

class World {
  constructor(width, height, tilesize) {
    this.width = width;
    this.height = height;
    this.tilesize = tilesize;
    this.entities = [new Player(0, 0, 16)];
    this.history = ['You enter the dungeon!', '---'];

    this.worldmap = new Array(this.width);
    for (let x = 0; x < this.width; x++) {
      this.worldmap[x] = new Array(this.height);
    }
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  removeEntity(entity) {
    this.entities = this.entities.filter(e => e !== entity);
  }

  moveToSpace(entity) {
    for (let x = entity.x; x < this.width; x++) {
      for (let y = entity.y; y < this.height; y++) {
        if (this.worldmap[x][y] === 0 && !this.getEntityAtLocation(x, y)) {
          entity.x = x;
          entity.y = y;
          return;
        }
      }
    }
  }

  isWall(x, y) {
    return (this.worldmap[x][y] === 1 || this.worldmap[x] === undefined || this.worldmap[y] === undefined);
  };

  getEntityAtLocation(x, y) {
    return this.entities.find(entity => entity.x === x && entity.y === y);
  }

  movePlayer(dx, dy) {
    let tempPlayer = this.entities[0].copyPlayer();
    tempPlayer.move(dx, dy);
    let entity = this.getEntityAtLocation(tempPlayer.x, tempPlayer.y);
    if (entity) {
      entity.action('take',this);
      entity.action('attack',this);
      entity.action('go',this);
      return;
    }

    if (this.isWall(tempPlayer.x, tempPlayer.y)) {
      this.addToHistory('You bump into a wall.');
    } else {
      this.entities[0].move(dx, dy);
    }
  }

  createCellularMap() {
    let map = new Map.Cellular(this.width, this.height, { connected: true });
    map.randomize(0.5);
    let userCallback = (x, y, value) => {
      if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
        this.worldmap[x][y] = 1;
      }
      this.worldmap[x][y] = (value === 0) ? 1 : 0;
    }
    map.create(userCallback);
    map.connect(userCallback, 1);
  }

  draw(ctx) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.worldmap[x][y] === 1) this.drawWall(ctx, x, y);
      }
    }
    this.entities.forEach(entity => entity.draw(ctx));
  }

  drawWall(ctx, x, y) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(x * this.tilesize, y * this.tilesize, this.tilesize, this.tilesize);
  }

  addToHistory(history) {
    this.history.push(history);
    if (this.history.length > 6) {
      this.history.shift();
    }
  }
}

export default World;