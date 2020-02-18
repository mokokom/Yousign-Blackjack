import React from "react";
import useDealerCards from "../../hooks/useDealerCards";

const Dealer = ({ dealerCards, isPlayerToPlay, dealerScore }) => {
	const [cards, pointTranslator] = useDealerCards(
		dealerCards,
		isPlayerToPlay,
		dealerScore
	);

	/* 	let translate = () => {
		switch (dealerCards[0].value) {
			case "ACE":
				dealerCards[0].value = dealerCards[0].value + 11 <= 21 ? 11 : 1;
				break;
			case "KING":
			case "QUEEN":
			case "JACK":
				dealerCards[0].value = 10;
				break;
			default:
				dealerCards[0].value = +dealerCards[0].value;
		}
		return dealerCards[0].value;
	}; */
	/* return dealerCards[0].value; */
	console.log(dealerCards[0].value);

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
