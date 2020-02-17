import React from "react";

const useDealerCards = (dealerCards, isPlayerToPlay, dealerScore) => {
	console.log(dealerCards, isPlayerToPlay);
	let cards = null;
	if (isPlayerToPlay) {
		cards = dealerCards.map((card, i) => {
			return i === 1 ? (
				<img
					key={card.code}
					src={card.image}
					alt={`card: ${card.value}`}
					className="hide"
					style={{ display: "" }}
				/>
			) : (
				<img key={card.code} src={card.image} alt={`card: ${card.value}`} />
			);
		});
	} else {
		cards = dealerCards.map((card, i) => {
			return (
				<img key={card.code} src={card.image} alt={`card: ${card.value}`} />
			);
		});
	}

	return [cards];
};

export default useDealerCards;
