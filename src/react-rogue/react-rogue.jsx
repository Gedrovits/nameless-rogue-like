import React, { useEffect, useRef, useState } from "react";

import InputManger from "./input-manager";
import World from "./world";
import Spawner from "./spawner";

const ReactRogue = ({ width, height, tilesize }) => {
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
    spawner.spawnLoot(10);
    spawner.spawnEnemies(5);
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
    // <>
    // <canvas ref={canvasRef} width={width * tilesize} height={height * tilesize} style={{ border: '1px solid black', background: '#778899' }} />
    // <h3>Player Inventory</h3>
    // <ul>
    //   {world.entities[0].inventory.map((item, index) => (<li key={index}>{item.attributes.name}</li>))}
    // </ul>
    // <h3>World History</h3>
    // <ul>
    //   {world.history.map((item, index) => (<li key={index}>{item}</li>))}
    // </ul>
    // </>
    <div className="container">
      <div className="item left-menu">
        <h3>Player Inventory</h3>
        <ul>
          {world.entities[0].inventory.map((item, index) => (<li key={index}>{item.attributes.name}</li>))}
        </ul>
      </div>
      <div className="item game">
        <canvas ref={canvasRef} width={width * tilesize} height={height * tilesize} style={{ border: '1px solid black', background: '#778899' }} />
      </div>
      <div className="item right-menu">
        <h3>World History</h3>
        <ul>
          {world.history.map((item, index) => (<li key={index}>{item}</li>))}
        </ul>
      </div>
    </div>
  );
};

export default ReactRogue;