import React, { useContext } from "react";
import useDealerCards from "../../hooks/useDealerCards";
import { AppContext } from "../../contexts/AppContext";
import "./Score.css";

const Score = () => {
	const { state } = useContext(AppContext);
	/* const { dealerCards, isPlayerToPlay, playerScore, dealerScore } = useContext(
		AppContext
	); */

	const [cards, pointTranslator] = useDealerCards(
		state.dealerCards,
		state.isPlayerToPlay,
		state.dealerScore
	);
	return (
		<div className="scores">
			{state.isPlayerToPlay ? (
				<div className="dealer-value">{pointTranslator()}</div>
			) : (
				<div className="dealer-value">{state.dealerScore}</div>
			)}

			<hr className="score-divider" />
			<div className="player-value">{state.playerScore}</div>
		</div>
	);
};

export default Score;
