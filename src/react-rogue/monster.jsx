import Entity from "./entity";

class Monster extends Entity {
  action(verb, world) {
    if (verb === "attack") {
      world.addToHistory(`Player attacks ${this.attributes.name}!`)
      if (world.entities[0].inventory.find(item => item.attributes.name === "Long Sword")) {
        this.attributes.health -= 3;
      } else {
        this.attributes.health -= 1;
      }
      if (this.attributes.health <= 0) {
        world.addToHistory(`${this.attributes.name} dies!`);
        world.removeEntity(this);
      } else {
        world.addToHistory(`${this.attributes.name} has ${this.attributes.health} health left.`);
        world.entities[0].attributes.health -= 1;
        if (world.entities[0].attributes.health <= 0) {
          world.addToHistory(`Player dies!`);
          world.removeEntity(world.entities[0]);
        } else {
          world.addToHistory(`Player has ${world.entities[0].attributes.health} health left.`);
        }
      }
    }
  }
}

export default Monster;