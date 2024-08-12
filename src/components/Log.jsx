export default function Log({turns}){
	// manage dynamic array of turns that grows with every click
	return (
		<ol id="log">
			{turns.map((turn) => (
				<li key={`${turn.square.row}${turn.square.col}`}>
					{turn.player} selected {turn.square.row}, {turn.square.col}
				</li>
			))
			}
		</ol>
	)
}