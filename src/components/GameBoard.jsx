const initialGameBoard= [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

export default function GameBoard({ onSelectSquare}){
	// const [gameBoard, setGameBoard] = useState(initialGameBoard);
	
	// function handleSelectSquare(rowIndex, colIndex){
	// 	setGameBoard((prevGameBoard) =>{
	// 		// create copy of existing board in new array
	// 		// allows react to schedule update
	// 		// instead of changing underlying array in mem
	// 		const updatedBoard = 
	// 			[...prevGameBoard.map(innerArray => [...innerArray])];
	// 		// requires map due to nested array. 
	// 		// React will not make a new ind copy of
	// 		// inner arrays if map not used

	// 		updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
	// 		return updatedBoard;
	// 	});
	// 	onSelectSquare();
	// }

	return (
		<ol id='game-board'>
			{gameBoard.map(
				(row, rowIndex) => 
				  <li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => 
						<li key={colIndex}>
							{/* pass anon fx -- pass params in fx*/}
							<button onClick={() => onSelectSquare(rowIndex, colIndex)}>
								{playerSymbol}
							</button>
						</li>)}
					</ol>
				  </li>)}
		</ol>
	)
}