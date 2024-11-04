import { useState } from 'react';

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
]
function GameBoard({onSelectSquare, activePlayerSymbol}){

	const [gameBoard, setGameBoard] = useState(initialGameBoard);
	
	function handleSelectSquare(rowIndex, colIndex){
		// use ...spread to make a copy of the arrays
		// so state update scheduling does not cause a bug
		setGameBoard((existingGameBoard) => {
			const updatedGameBoard = [...existingGameBoard.map(
				(innerArray) => [...innerArray] )];
			updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol
			return updatedGameBoard;
		});

		onSelectSquare();
	}
	
	return (
		<ol id="game-board">
			{gameBoard.map((row, rowIndex) => <li key={rowIndex}>
				<ol>
					{row.map((playerSymbol, colIndex) => <li key={colIndex}>
							<button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
								{playerSymbol}
							</button>
					</li>)}
				</ol>
			</li> )}
		</ol>	
	)
}

export default GameBoard;