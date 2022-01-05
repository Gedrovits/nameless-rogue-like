import Loot from './loot.jsx';
import Monster from './monster.jsx';
import Stairs from './stairs.jsx';

const lootTable = [
  {
    name: 'Health Potion',
    type: 'potion',
    color: '#ff0000',
    ascii: '%',
    offset: { x: 6, y: 3 }
  },
  {
    name: 'Mana Potion',
    type: 'potion',
    color: '#0000ff',
    ascii: '%',
    offset: { x: 6, y: 3 }
  },
  {
    name: 'Long Sword',
    type: 'weapon',
    color: '#0f3000',
    ascii: '/',
    offset: { x: 6, y: 3 }
  },
  {
    name: 'Gold Coin',
    type: 'coin',
    color: '#ffd700',
    ascii: '$',
    offset: { x: 3, y: 3 }
  },
  {
    name: 'Light Armour',
    type: 'armour',
    color: '#f0f0f0',
    ascii: '#',
    offset: { x: 4, y: 3 }
  }
];

const monsterTable = [
  {
    name: 'Goblin',
    color: 'lightgrey',
    ascii: 'G',
    health: 2,
    offset: { x: 2, y: 3 },
  },
  {
    name: 'Orc',
    color: 'darkgrey',
    ascii: 'O',
    health: 5,
    offset: { x: 4, y: 3 },
  },
  {
    name: 'Troll',
    color: 'darkgreen',
    ascii: 'T',
    health: 10, 
    offset: { x: 3, y: 2 },
  },
  {
    name: 'Giant',
    color: 'darkred',
    ascii: 'A',
    health: 15,
    offset: { x: 4, y: 2 },
  }
];

class Spawner {
  constructor(world) {
    this.world = world;
  }
  spawn(spawnCount, createEntity) {
    for (let i = 0; i < spawnCount; i++) {
    let entity = createEntity();
    this.world.addEntity(entity);
    this.world.moveToSpace(entity);
    }
  }

  spawnLoot(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Loot(randNum(this.world.width - 1), randNum(this.world.height - 1), this.world.tilesize, lootTable[randNum(lootTable.length)]);
    });
  }

  spawnEnemies(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Monster(randNum(this.world.width - 1), randNum(this.world.height - 1), this.world.tilesize, monsterTable[randNum(monsterTable.length)]);
    });
  }

  spawnStairs() {
    let stairs = new Stairs(this.world.width - 10, this.world.height - 10, this.world.tilesize);
    this.world.addEntity(stairs);
    this.world.moveToSpace(stairs);
  }

}

function randNum(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;