// capitilization on "PLayer" doesn't match Player.jsx
import Player from './components/PLayer.jsx';

function App() {
  
return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Player 1" symbol="X" />
          <Player name="Player 2" symbol="O" />
        </ol>
        GAME BOARD
      </div>
      LOG
    </main>
  )
}

export default App
