import './App.css';
import ReactRogue from './react-rogue/react-rogue';

function App() {
  return (
    <ReactRogue
      width={10}
      height={10}
      tilesize={16}
      lootCount={1}
      enemiesCount={1}
    />
  );
}

export default App;
