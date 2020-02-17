import React from "react";
import "./Player.css";

const Player = ({ playerCards, hit, score, playerScore }) => {
	/* console.log(playerCards); */

	return (
		<>
			<h1>Player: {playerScore}</h1>
			<div>
				<button onClick={hit}>HIT</button>
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
