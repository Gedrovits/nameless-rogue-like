import React, { useEffect, useRef, useState } from "react";

import InputManger from "./input-manager";
import World from "./world";
import Spawner from "./spawner";

const ReactRogue = ({ width, height, tilesize, lootCount, enemiesCount }) => {
  const canvasRef = useRef();
  const [world, setWorld] = useState(new World(width, height, tilesize));
  let inputManger = new InputManger();
  const handleInput = (action, data) => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld);
  }

  useEffect(() => {
    inputManger.bindKeys();
    inputManger.subscribe(handleInput);
    return () => {
      inputManger.unbindKeys();
      inputManger.unsubscribe(handleInput);
    }
  });

  useEffect(() => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.entities[0]);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(lootCount || 10);
    spawner.spawnEnemies(enemiesCount || 5);
    spawner.spawnStairs();
    setWorld(newWorld);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, (width * tilesize), (height * tilesize));
    world.draw(ctx);
  });

  return (
    <div className="container">
      <div className="item left-menu">
        <strong>Player Inventory</strong>
        <ul>
          {world.entities[0].inventory.map((item, index) => (<li key={index}>{item.attributes.name}</li>))}
        </ul>
      </div>
      <div className="item game">
        <canvas ref={canvasRef} width={width * tilesize} height={height * tilesize} style={{ border: '1px solid black', background: '#778899' }} />
      </div>
      <div className="item right-menu">
        <strong>World History</strong>
        <ul>
          {world.history.map((item, index) => (<li key={index}>{item}</li>))}
        </ul>
      </div>
    </div>
  );
};

export default ReactRogue;