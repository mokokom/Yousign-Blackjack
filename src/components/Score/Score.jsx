import React, { useContext } from "react";
import useDealerCards from "../../hooks/useDealerCards";
import { AppContext } from "../../contexts/AppContext";
import "./Score.css";

const Score = () => {
	const { dealerCards, isPlayerToPlay, playerScore, dealerScore } = useContext(
		AppContext
	);

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
