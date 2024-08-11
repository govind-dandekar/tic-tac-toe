// capitilization on "PLayer" doesn't match Player.jsx
import Player from './components/PLayer.jsx';
import GameBoard from './components/GameBoard.jsx';

function App() {
  
return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 2" symbol="O" />
        </ol>
        <GameBoard />
      </div>
      LOG
    </main>
  )
}

export default App
