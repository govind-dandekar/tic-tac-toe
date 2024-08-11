import { useState } from 'react';

// capitilization on "PLayer" doesn't match Player.jsx
import Player from './components/PLayer.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';

function App() {
  // manage clicks as a list and derive info for board and log
  // from same array
  const [gameTurns, setGameTurns] = useState([]);

  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, columnIndex){
    // since new state is dep on old state, pass anon fx
    // with old state
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    // update array of turns when square selected by player
    setGameTurns((prevTurns) => {
      //
      let currentPlayer = 'X';
      // check to see if last play was made by Player X
      // and update currentPlayer if so
      // ensure there is at least one turn in array
      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O'
      }

      // immutable update;  use spread op on prevTurns
      const updatedTurns = [{ square: {
        row: rowIndex,
        column: columnIndex
      }, player: currentPlayer }, ...prevTurns]
    });

    return updatedTurns;
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
