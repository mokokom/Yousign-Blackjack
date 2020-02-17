import React from "react";
import "./Player.css";

const Player = ({ playerCards, hit, stand, playerScore, isPlayerToPlay }) => {
	return (
		<>
			<h1>Player: {playerScore}</h1>
			<div>
				<button disabled={!isPlayerToPlay} onClick={hit}>
					HIT
				</button>
				<button disabled={!isPlayerToPlay} onClick={stand}>
					STAND
				</button>
			</div>
			<div className="card-container">
				{playerCards.map(card => {
					return (
						<div key={card.code}>
							<img src={card.image} alt={`${card.suit} ${card.value}`} />
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Player;
