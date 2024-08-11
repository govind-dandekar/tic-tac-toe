import { useState } from 'react';

// capitilization on "PLayer" doesn't match Player.jsx
import Player from './components/PLayer.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(){
    // since new state is dep on old state, pass anon fx
    // with old state
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns();

  }
    
  return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player 
              initialName="Player 1" 
              symbol="X"
              isActive={activePlayer === 'X'} 
            />
            <Player 
              initialName="Player 2" 
              symbol="O" 
              isActive={activePlayer === 'O'}
            />
          </ol>
          <GameBoard 
            onSelectSquare={handleSelectSquare}
            activePlayerSymbol={activePlayer}/>
        </div>
        <Log />
      </main>
    )
}

export default App
