import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';

import { WINNING_COMBINATIONS } from './winning-combinations'

const PLAYERS = {
  X: 'Player 1',
  Y: 'Player 2'
}

const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
]

// set fx outside app because it does not need
// 1] state access or
// 2] to be re-executed when component re-executes
function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O'
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

	// if turns is empty wont execute
	for (const turn of gameTurns){
		const {square, player} = turn;
		const {row, col} = square;
		
		// derived gameboard state from turns array on obj
		gameBoard[row][col] = player
	}

  return gameBoard
}

function deriveWinner(gameBoard, players){
  let winner = null;

  // derive winner from gameTurns
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    
    if (firstSquareSymbol && 
          firstSquareSymbol === secondSquareSymbol &&
          secondSquareSymbol === thirdSquareSymbol
    ){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)

  const [gameTurns, setGameTurns] = useState([]); 

  // derived from current gameTurns state
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = (gameTurns.length === 9 && !winner);

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      // derived from prevTurns state
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
      { square: {
        row: rowIndex,
        col: colIndex
      },
        player: currentPlayer} , ...prevTurns];

      return updatedTurns;
    });
  }

  function handleRematch(){
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        // brackets set property
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
        {(winner || hasDraw) && <GameOver 
                                    winner={winner}
                                    onRematchClick={handleRematch}
                                  />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log 
        turns={gameTurns} 
      />
    </main>
  )
}

export default App
