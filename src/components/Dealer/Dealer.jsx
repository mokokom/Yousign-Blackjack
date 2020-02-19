import React, { useEffect } from "react";
import useDealerCards from "../../hooks/useDealerCards";
import "../main.css";
import "./Dealer.css";
let dealerVictory = 0;
const Dealer = ({
	dealerCards,
	isPlayerToPlay,
	dealerScore,
	wichPlayerWon,
	isCardLoading
}) => {
	const [cards, pointTranslator] = useDealerCards(
		dealerCards,
		isPlayerToPlay,
		dealerScore
	);
	useEffect(() => {
		if (wichPlayerWon === "dealer") dealerVictory += 1;
	}, [wichPlayerWon]);

	return (
		<div className="dealer-container">
			<div className="dealer-score-container">
				<div className="dealer-score-title">DEALER</div>
				<div className="dealer-score">{dealerVictory}</div>
			</div>
			<div className="cards-container">
				{isCardLoading ? <div>LOAD</div> : cards}
			</div>
			{wichPlayerWon === "dealer" && <div>WIN</div>}
			{wichPlayerWon === "player" && <div>LOSE</div>}
		</div>
	);
};

export default Dealer;
