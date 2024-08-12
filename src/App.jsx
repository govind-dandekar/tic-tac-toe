import { useState } from 'react';

// capitilization on "PLayer" doesn't match Player.jsx
import Player from './components/PLayer.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD= [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players){
  let winner = null;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
  
    if (firstSquareSymbol && 
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol){
          winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  // create COPY of gameboard in new memory ref
  // otherwise reset won't work 
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

	// if turns is empty, for loop wont execute
	for (const turn of gameTurns){
		// pull square and player from array item via destructuring
		const { square, player } = turn;
		const { row, col } = square;

		// gameBoard is derived state (computed from actual state)
		// should try to manage as little state as needed
		// and derive state when possible
		gameBoard[row][col] = player;
	}
  return gameBoard;
}


function App() {
  // set player names at App level
  const [players, setPlayers] = useState(PLAYERS); 

  // manage clicks as a list and derive info for board and log
  // from same array
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    // since new state is dep on old state, pass anon fx
    // with old state
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    // update array of turns when square selected by player
    setGameTurns((prevTurns) => {
      // based active player on prev state so pass prevturns
      const currentPlayer = deriveActivePlayer(prevTurns);

      // immutable update;  use spread op on prevTurns
      const updatedTurns = [{ square: {
        row: rowIndex,
        col: colIndex
      }, player: currentPlayer }, ...prevTurns]
    
      // console.log(updatedTurns);
      return updatedTurns;
    }); 
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  
    
  return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player 
              initialName={PLAYERS.X} 
              symbol="X"
              isActive={activePlayer === 'X'}
              onChangeName={handlePlayerNameChange}  
              
            />
            <Player 
              initialName={PLAYERS.O}
              symbol="O" 
              isActive={activePlayer === 'O'}
              onChangeName={handlePlayerNameChange}  
            />
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
          <GameBoard 
            onSelectSquare={handleSelectSquare}
            board={gameBoard}/>
        </div>
        <Log turns={gameTurns}/>
      </main>
    )
}

export default App
