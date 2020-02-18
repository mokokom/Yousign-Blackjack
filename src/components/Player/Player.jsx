import React, { useState, useEffect } from "react";
import "./Player.css";
import "../main.css";
let playerVictory = 0;
const Player = ({
	playerCards,
	hit,
	stand,
	playerScore,
	isPlayerToPlay,
	wichPlayerWon
}) => {
	useEffect(() => {
		{
			if (wichPlayerWon === "player") playerVictory += 1;
		}
	}, [wichPlayerWon]);

	return (
		<>
			{/* <h1>Player: {playerScore}</h1> */}
			<div className="player-score-container">
				<div className="player-score-title">YOUSIGNER</div>
				<div className="player-score">{playerVictory}</div>
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
			{/* {wichPlayerWon === "player" && <div>{`YOUSIGNER: + 1`}</div>}
			{wichPlayerWon === "dealer" && <div>LOSE</div>} */}
			<div>
				<div
					className="action-btn hit-btn"
					disabled={!isPlayerToPlay}
					onClick={hit}
				>
					<span className="action-btn_title">HIT</span>
				</div>
				<div
					className="action-btn stand-btn"
					disabled={!isPlayerToPlay}
					onClick={stand}
				>
					<span className="action-btn_title">STAND</span>
				</div>
			</div>
		</>
	);
};

export default Player;
