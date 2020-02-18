import React from "react";
import useDealerCards from "../../hooks/useDealerCards";
import "./Score.css";

const Score = ({ dealerCards, dealerScore, playerScore, isPlayerToPlay }) => {
	const [cards, pointTranslator] = useDealerCards(
		dealerCards,
		isPlayerToPlay,
		dealerScore
	);
	return (
		<div className="scores">
			{isPlayerToPlay ? (
				<div className="dealer-value">{pointTranslator()}</div>
			) : (
				<div className="dealer-value">{dealerScore}</div>
			)}

			<hr className="score-divider" />
			<div className="player-value">{playerScore}</div>
		</div>
	);
};

export default Score;
