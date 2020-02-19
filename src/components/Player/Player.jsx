import React, { useEffect } from "react";
import "./Player.css";
import "../main.css";

let playerVictory = 0;

const Player = ({ playerCards, hit, stand, isPlayerToPlay, wichPlayerWon }) => {
	useEffect(() => {
		if (wichPlayerWon === "yousigner") playerVictory += 1;
	}, [wichPlayerWon]);

	return (
		<>
			<div className="score-container player-score-container">
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
							<div className="general-overlay player-overlay"></div>
						</div>
					);
				})}
			</div>
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
