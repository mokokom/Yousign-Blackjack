import React, { useEffect, useContext } from "react";
import useDealerCards from "../../hooks/useDealerCards";
import { AppContext } from "../../contexts/AppContext";
import "../main.css";
import "./Dealer.css";

let dealerVictory = 0;

const Dealer = () => {
	const {
		dealerCards,
		isPlayerToPlay,
		dealerScore,
		wichPlayerWon
	} = useContext(AppContext);

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
			<div className="score-container dealer-score-container">
				<div className="dealer-score-title">DEALER</div>
				<div className="dealer-score">{dealerVictory}</div>
			</div>
			<div className="cards-container">{cards}</div>
		</div>
	);
};

export default Dealer;
