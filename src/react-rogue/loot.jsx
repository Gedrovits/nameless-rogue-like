import Entity from "./entity";

class Loot extends Entity {
  action(verb, world) {
    if (verb === "take") {
      world.entities[0].addItem(this);
      world.removeEntity(this);
      if (this.attributes.name === "Long Sword") {
        world.addToHistory("You feel a rush of power as you pick up the sword");
      }
      if (this.attributes.name === "Health Potion") {
        if (world.entities[0].attributes.health <= 25) {
          world.entities[0].attributes.health += 5;
          world.addToHistory("Your health has been restored by 5");
        } else {
          world.addToHistory("Your health is already full");
        }
      }
      if (this.attributes.name === "Mana Potion") {
        world.addToHistory("You feel your mana regenerating");
      }
      if (this.attributes.name === "Gold Coin") {
        world.addToHistory("You pick up the gold coin");
      }
      if (this.attributes.name === "Light Armour") {
        world.entities[0].attributes.health += 10;
        world.addToHistory("You feel more protected");
      }
    }
  }
}

export default Loot;