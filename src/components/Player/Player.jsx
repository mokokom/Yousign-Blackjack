import React, { useEffect, useContext } from "react";

import { AppContext } from "../../contexts/AppContext";

import "./Player.css";
import "../main.css";

let playerVictory = 0;

const Player = () => {
	/* const { playerCards, isPlayerToPlay, hit, stand, wichPlayerWon } = useContext(
		AppContext
	); */
	const { state, hit, stand } = useContext(AppContext);

	useEffect(() => {
		if (state.whichPlayerWon === "yousigner") playerVictory += 1;
	}, [state.whichPlayerWon]);

	return (
		<>
			<div className="score-container player-score-container">
				<div className="player-score-title">YOUSIGNER</div>
				<div className="player-score">{playerVictory}</div>
			</div>

			<div className="cards-container">
				{state.playerCards.map(card => {
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
					disabled={!state.isPlayerToPlay}
					onClick={hit}
				>
					<span className="action-btn_title">HIT</span>
				</div>
				<div
					className="action-btn stand-btn"
					disabled={!state.isPlayerToPlay}
					onClick={stand}
				>
					<span className="action-btn_title">STAND</span>
				</div>
			</div>
		</>
	);
};

export default Player;
