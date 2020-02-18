import React from "react";
import "./Player.css";
import "../main.css";

const Player = ({
	playerCards,
	hit,
	stand,
	playerScore,
	isPlayerToPlay,
	isPlayerWon
}) => {
	return (
		<>
			{/* <h1>Player: {playerScore}</h1> */}
			<div className="player-score-container">
				<div className="player-score-title">Player</div>
				<div className="player-score">{playerScore}</div>
			</div>

			<div className="cards-container">
				{playerCards.map(card => {
					return (
						<div key={card.code} className="card-container">
							<img
								className="card-container__image"
								src={card.image}
								alt={`${card.suit} ${card.value}`}
							/>
							<div className="player-overlay"></div>
						</div>
					);
				})}
			</div>
			{isPlayerWon === "player" && <div>WIN</div>}
			{isPlayerWon === "dealer" && <div>LOOSE</div>}
			<div>
				<div
					className="action-btn hit-btn"
					disabled={!isPlayerToPlay}
					onClick={hit}
				>
					HIT
				</div>
				<div
					className="action-btn stand-btn"
					disabled={!isPlayerToPlay}
					onClick={stand}
				>
					STAND
				</div>
			</div>
		</>
	);
};

export default Player;
