import React from "react";
import useDealerCards from "../../hooks/useDealerCards";

const Dealer = ({ dealerCards, isPlayerToPlay, dealerScore, isPlayerWon }) => {
	const [cards, pointTranslator] = useDealerCards(
		dealerCards,
		isPlayerToPlay,
		dealerScore
	);

	return (
		<>
			{isPlayerToPlay ? (
				<h1>Dealer: {pointTranslator()}</h1>
			) : (
				<h1>Dealer: {dealerScore}</h1>
			)}
			<div className="card-container">{cards}</div>
			{isPlayerWon === "dealer" && <div>Win</div>}
			{isPlayerWon === "player" && <div>LOOSE</div>}
		</>
	);
};

export default Dealer;
