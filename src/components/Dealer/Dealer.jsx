import React from "react";
import useDealerCards from "../../hooks/useDealerCards";

const Dealer = ({ dealerCards, isPlayerToPlay, dealerScore }) => {
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
			{/* <h1>Dealer: {dealerCards[0].value}</h1> */}
			<div className="card-container">{cards}</div>
		</>
	);
};

export default Dealer;
