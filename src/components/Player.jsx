import { useState } from "react";

function Player({initialName, symbol, isActive}){
	
	const [ playerName, setPlayerName ] = useState(initialName);
	const [ isEditing, setIsEditing ] = useState(false);

	function handleEditClick(){
		setIsEditing(editing => !editing)
	}

	function handleChange(event){
		setPlayerName(event.target.value)
	}

	return (
		<li className={isActive ? 'active' : undefined}>
            <span className="player">
              {isEditing ? 
			  	<input
					onChange={handleChange}
					value={playerName}
					type="text" 
					required 
				/> :
				<span className="player-name">{playerName}</span>
			  }
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
				{ isEditing ? "Save" : "Edit" }
			</button>
        </li>
	)
}

export default Player;