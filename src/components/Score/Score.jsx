import React from "react";
import "./Score.css";

const Score = ({ dealerScore, playerScore }) => {
	return (
		<div className="scores">
			<div className="dealer-value">{dealerScore}</div>
			<hr className="score-divider" />
			<div className="player-value">{playerScore}</div>
		</div>
	);
};

export default Score;
