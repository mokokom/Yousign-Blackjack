import React, { useEffect, useContext } from "react";
import useDealerCards from "../../hooks/useDealerCards";
import { AppContext } from "../../contexts/AppContext";
import "../main.css";
import "./Dealer.css";

let dealerVictory = 0;

const Dealer = () => {
	const { state } = useContext(AppContext);

	const [cards, pointTranslator] = useDealerCards(
		state.dealerCards,
		state.isPlayerToPlay,
		state.dealerScore
	);
	useEffect(() => {
		if (state.whichPlayerWon === "dealer") dealerVictory += 1;
	}, [state.whichPlayerWon]);

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
