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
		{
			if (wichPlayerWon === "dealer") dealerVictory += 1;
		}
	}, [wichPlayerWon]);

	return (
		<>
			<div className="dealer-score-container">
				<div className="dealer-score-title">DEALER</div>
				<div className="dealer-score">{dealerVictory}</div>
			</div>
			{/* {isPlayerToPlay ? (
			) : (
				<div className="dealer-score-container">
					<div className="dealer-score-title">Dealer</div>
					<div className="dealer-score">{dealerScore}</div>
				</div>
			)} */}
			<div className="cards-container">
				{isCardLoading ? <div>LOAD</div> : cards}
			</div>
			{wichPlayerWon === "dealer" && <div>WIN</div>}
			{wichPlayerWon === "player" && <div>LOOSE</div>}
		</>
	);
};

export default Dealer;
