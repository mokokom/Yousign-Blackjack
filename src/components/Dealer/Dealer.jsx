import React from "react";
import useDealerCards from "../../hooks/useDealerCards";

const Dealer = ({ dealerCards, isPlayerToPlay, dealerScore }) => {
	const [cards] = useDealerCards(dealerCards, isPlayerToPlay, dealerScore);
	console.log(isPlayerToPlay);

	return (
		<>
			{isPlayerToPlay ? (
				<h1>Dealer: {dealerCards[0].value}</h1>
			) : (
				<h1>Dealer: {dealerScore}</h1>
			)}
			{/* <h1>Dealer: {dealerCards[0].value}</h1> */}
			<div className="card-container">{cards}</div>
		</>
	);
};

export default Dealer;
