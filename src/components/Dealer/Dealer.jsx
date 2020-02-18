import React from "react";
import useDealerCards from "../../hooks/useDealerCards";
import "../main.css";
import "./Dealer.css";

const Dealer = ({
	dealerCards,
	isPlayerToPlay,
	dealerScore,
	isPlayerWon,
	isCardLoading
}) => {
	const [cards, pointTranslator] = useDealerCards(
		dealerCards,
		isPlayerToPlay,
		dealerScore
	);

	return (
		<>
			{isPlayerToPlay ? (
				<div className="dealer-score-container">
					<div className="dealer-score-title">Dealer</div>
					<div className="dealer-score">{pointTranslator()}</div>
				</div>
			) : (
				<div className="dealer-score-container">
					<div className="dealer-score-title">Dealer</div>
					<div className="dealer-score">{dealerScore}</div>
				</div>
			)}
			<div className="cards-container">
				{isCardLoading ? <div>LOAD</div> : cards}
			</div>
			{isPlayerWon === "dealer" && <div>WIN</div>}
			{isPlayerWon === "player" && <div>LOOSE</div>}
		</>
	);
};

export default Dealer;
