import Entity from "./entity";
import Spawner from "./spawner";

class Stairs extends Entity {
  attributes = {
    name: "Stairs",
    color: "#000",
    ascii: ">",
    offset: { x: 2, y: 2 }
  }

  action(verb, world) {
    if (verb === "go") {
      world.addToHistory(`You go down the stairs.`);
      world.createCellularMap();
      world.entities[0].x = 0;
      world.entities[0].y = 0;
      world.moveToSpace(world.entities[0]);
      world.entities = world.entities.filter(e => e === world.entities[0]);
      let spawner = new Spawner(world);
      spawner.spawnLoot(10);
      spawner.spawnEnemies(6);
      spawner.spawnStairs();
    }
  }
}

export default Stairs;