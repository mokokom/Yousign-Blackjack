import React from "react";
import useDealerCards from "../../hooks/useDealerCards";

const Dealer = ({ dealerCards, isPlayerToPlay, dealerScore }) => {
	const [cards] = useDealerCards(dealerCards, isPlayerToPlay, dealerScore);
	return (
		<>
			<h1>Dealer: {dealerScore}</h1>
			<div className="card-container">{cards}</div>
		</>
	);
};

export default Dealer;
